import React, { createContext, useContext, useState, useEffect } from 'react';
// Adjust the import path as necessary
// Adjust the import path as necessary

import { SearchPmbcNotificateRequest } from '../services/appService/notificate';
import { useWebSocket } from './WebSocketProvider';
import Toast from 'react-native-toast-message';
import FileUtils from '../utils/fileUtils';
import { PmbcNotificateService } from '../services/appService/notificate/notificate.service';
import { useUser } from './UserContext';
import MyToastUtils from '../utils/toastConfig';

interface NewsfeedContextType {
  listNewsfeed: any[];
  setListNewsfeed: React.Dispatch<React.SetStateAction<any[]>>;
  pageNewsfeed: number;
  setPageNewsfeed: React.Dispatch<React.SetStateAction<number>>;
  listImageNewsFeed: { [key: string]: any };
  setListImageNewsFeed: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  loadListImage: (listData: any[], filedImage: string) => Promise<void>; // Add loadListImage to context
  getListNewsfeed: (pageInput?: number) => Promise<void>; // Add getListNewsfeed to context
  countThongbao: number; // Add countThongbao to context
  setCountThongbao: React.Dispatch<React.SetStateAction<number>>; // Add setCountThongbao to context
  isHaveMoreNewsFeed: boolean;
  getListNewsfeedByTime: () => Promise<void>;
}

const itemPerPage = 15;
const NewsfeedContext = createContext<NewsfeedContextType | undefined>(undefined);

export const NewsfeedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listNewsfeed, setListNewsfeed] = useState<any[]>([]);
  const [pageNewsfeed, setPageNewsfeed] = useState<number>(0);
  const [listImageNewsFeed, setListImageNewsFeed] = useState<{ [key: string]: any }>({});
  const [countThongbao, setCountThongbao] = useState(0); // Initialize countThongbao
  const [isHaveMoreNewsFeed, setIsHaveMoreNewsFeed] = useState(true); // Initialize countThongbao
  const { userDetail } = useUser();
  const pmbcNotificateService = PmbcNotificateService.getInstance();

  const { subscribeSocket } = useWebSocket();

  useEffect(() => {
    setCountThongbao(0);
    getListNewsfeed(0);

    if (!userDetail?.userId) return;

    const handleMessage = (socketData: any) => {
      // Filter type ở đây
      if (socketData?.typeMessage !== 'noti') return;

      setListNewsfeed(prev => [socketData, ...prev]);
      setCountThongbao(prev => prev + 1);

      if (socketData?.user_created != userDetail?.userId) {
        MyToastUtils.show({
          type: 'info',
          text1: `${socketData.vaiTro == 3 ? "TT" : "Đ/c"} ${socketData.user_createdST || ""}`,
          text2: `${socketData.action || ""}${socketData.tieu_de ? ": " + socketData.tieu_de : ""}`,
        });
      }

    };

    const unsubscribe = subscribeSocket(handleMessage);
    return () => unsubscribe();
  }, [userDetail?.userId]);

  // Load images whenever listNewsfeed changes
  useEffect(() => {
    if (listNewsfeed.length > 0) {
      loadListImage(listNewsfeed, 'image_userCreated');
    }
  }, [listNewsfeed]);

  const loadListImage = async (listData: any[], filedImage: string) => {
    try {
      const uniqueImages = [...new Set(listData.map(item => item[filedImage]))]
        .filter(imageName => !listImageNewsFeed[imageName]);

      if (uniqueImages.length === 0) return;

      const imagePromises = uniqueImages.map(imageName => FileUtils.loadImage(imageName));
      const loadedImages = await Promise.all(imagePromises);

      const newImagesObject = uniqueImages.reduce((acc, imageName, index) => ({
        ...acc,
        [imageName]: loadedImages[index]
      }), {});

      setListImageNewsFeed(prev => ({
        ...prev,
        ...newImagesObject
      }));
    } catch (error) {
      // console.error('Error loading images:', error);
    }
  };

  const getListNewsfeed = async (pageInput?: number, isHaveMoreNewsFeedInput?: boolean) => {
    let currentPage = pageInput !== undefined ? pageInput : pageNewsfeed;

    const check = isHaveMoreNewsFeedInput != null && isHaveMoreNewsFeedInput != undefined ? isHaveMoreNewsFeedInput : isHaveMoreNewsFeed

    if (!check) {
      return;
    }

    setPageNewsfeed(currentPage);

    const request = new SearchPmbcNotificateRequest(currentPage, itemPerPage); // Adjust itemPerPage as necessary

    try {
      const response = await pmbcNotificateService.getNewsfeed(request);

      if (response?.data) {
        setCountThongbao(response.data.count ? response.data.count : 0); // Set countThongbao from response
        if (response.data.lstObjs?.length > 0) {
          setListNewsfeed(prev => [...prev, ...response.data.lstObjs]);
        } else {
          setIsHaveMoreNewsFeed(false);
          setPageNewsfeed(currentPage - 1);
        }
      }
    } catch (error) {
      console.error('Error loading images:', error);
    } finally {

    }

  };

  // Dùng cho interval
  const getListNewsfeedByTime = async () => {
    const request = new SearchPmbcNotificateRequest(); // Adjust itemPerPage as necessary
    request.timeLoadMobile = 5;

    const response = await pmbcNotificateService.getNewsfeedByTime(request);

    if (response?.data?.lstObjs?.length > 0) {
      setListNewsfeed(prev => [...response.data.lstObjs, ...prev]);
      setCountThongbao(prev => prev + response.data.lstObjs.length);

      MyToastUtils.show({
        type: 'info',
        text2: `Bạn có ${response.data.lstObjs.length} thông báo mới`,
      });
    }
  };

  return (
    <NewsfeedContext.Provider value={{
      listNewsfeed,
      setListNewsfeed,
      pageNewsfeed,
      setPageNewsfeed,
      listImageNewsFeed,
      setListImageNewsFeed,
      loadListImage,
      getListNewsfeed,
      countThongbao,
      setCountThongbao,
      isHaveMoreNewsFeed,
      getListNewsfeedByTime
    }}>
      {children}
    </NewsfeedContext.Provider>
  );
};

export const useNewsfeed = () => {
  const context = useContext(NewsfeedContext);
  if (!context) {
    throw new Error('useNewsfeed must be used within a NewsfeedProvider');
  }
  return context;
}; 
