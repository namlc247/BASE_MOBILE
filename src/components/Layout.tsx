import { Bell, Menu, MessageCircle, X, LogOut, ChevronLeft, ChevronRight } from "lucide-react-native";
import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  ActivityIndicator,
  useWindowDimensions,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";


import adminImg from "../accsets/avatarDefault.jpg";
import calendarMenu from "../accsets/iconApp/calendarMenu.png";
import chatMenu from "../accsets/iconApp/chatMenu.png";
import meetingMenu from "../accsets/iconApp/meetingMenu.png";
import notificationMenu from "../accsets/iconApp/notificationMenu.png";
import messagesIcon from "../accsets/icon/messages.png";
import notificationIcon from "../accsets/icon/notification.png";
import linkIcon from "../accsets/icon/link.png";
import this_weekIcon from "../accsets/icon/this_week.png";
import approve_calendar from "../accsets/icon/approve_calendar.png";
import fileTextIcon from "../accsets/icon/fileText.png";
import boardIcon from "../accsets/icon/board.png";
import logoutIcon from "../accsets/icon/logout.png";
import menuIcon from "../accsets/icon/menu.png";
import BTTMImage from "../accsets/iconApp/logoApp.png";
import IconButton from "./button/IconButton";
import manualIcon from "../accsets/icon/manual.png";
import phoneIcon from "../accsets/icon/phone.png";
import officer1 from "../accsets/user.jpg";
import { useAuthStore } from "../stores/authStore";
import { useUser } from '../contexts/UserContext';
import LoadingModal from './LoadingModal';
import { useNewsfeed } from '../contexts/NewsfeedContext'; // Import the useNewsfeed hook
import RenderHtml from 'react-native-render-html';

import { useInterval } from "../contexts/IntervalProvider";
import TextButton from "./button/TextButton";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/AppNavigator";
import CalendarUtils from "../utils/calendarUtils";
import FileUtils from "../utils/fileUtils";
import { PmbcNotificateService } from "../services/appService/notificate/notificate.service";
import Toast from "react-native-toast-message";
import MyToastUtils from "../utils/toastConfig";
import WebSocketService from '../services/WebSocketService';
import { useWebSocket } from "../contexts/WebSocketProvider";
import { NotificationItem } from "./notification/NotificationItem";
import { SignalService } from "../services/signal/signal.service";
import BottomBar from "./BottomBar";
import COLORS from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { LucideIcon } from "./LucideIcon";

const menuData = [
  {
    title: "Quản lý sinh viên",
    route: "QlSinhVien",
    icon: boardIcon,
  },
];

const menuNameData: { [key: string]: string } = {
  "Settings": "Cài đặt",
  "Thongbao": "Thông báo",
  "Tienich": "Tiện ích",
  "HomePage": "Trang chủ",
};

interface LayoutProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

const roleMap = new Map<any, { key: any; path: string }[]>([
  [
    "chitietlich",
    [
      { key: "TTB", path: "Calendar_TTBTTM_Duyetlich" },
      { key: "TKTTB", path: "" },
      { key: "CHCPBTCCQĐV", path: "" },
    ],
  ],
  [
    "tonghoplich",
    [
      { key: "CHCPBTCCQĐV", path: "Calendar" },
      { key: "TTVP", path: "Calendar" },
      { key: "TTMT", path: "Calendar" },
      { key: "TKTTB", path: "Calendar" },
    ],
  ],
  [
    "chitietlich-donvi",
    [
      { key: "TLCPB", path: "Calendar_TT_Donvi" },
      { key: "CHCPBTCCQĐV", path: "Calendar_TT_Donvi" },
      {
        key: "CHCCQĐVTTB",
        path: "Calendar_TT_Donvi",
      },
      {
        key: "TTVP",
        path: "Calendar_TT_Donvi",
      },
    ],
  ],
  [
    "chitietlich-donvi-trucban",
    [
      { key: "TLCPB", path: "" },
      { key: "CHCPBTCCQĐV", path: "" },
      {
        key: "CHCCQĐVTTB",
        path: "",
      },
      {
        key: "TTVP",
        path: "",
      },
    ],
  ],
  [
    "chitietlich-phongban",
    [
      { key: "TLCPB", path: "Calendar" },
      {
        key: "CHCPBTCCQĐV",
        path: "Calendar",
      },
    ],
  ],
]);


const Layout = ({ children, isLoading = false }: LayoutProps) => {
  const { width, height } = useWindowDimensions();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const sidebarWidth = useRef(new Animated.Value(250)).current;
  const [showModal, setShowModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const { userDetail, listRole, listImageGlobal } = useUser();
  const { isHaveMoreNewsFeed, pageNewsfeed, listNewsfeed, listImageNewsFeed, countThongbao, getListNewsfeed, setListNewsfeed, setCountThongbao } = useNewsfeed();
  const route = useRoute();
  const [hopStatus, setHopStatus] = React.useState<number>(1);


  const { isSocketConnected } = useWebSocket();

  const pmbcNotificateService = PmbcNotificateService.getInstance();
  const signalService = SignalService.getInstance();

  const logout = useAuthStore((state) => state.logout);
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProp>();

  // useFocusEffect(
  //   React.useCallback(() => {


  //   }, [route.name])
  // );

  const toggleSidebar = () => {
    setShowModal(!showModal);
  };

  const handleUserPress = () => {
    setShowUserMenu(!showUserMenu);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const doLogOut = () => {
    signalService.localStore.reSet();
    WebSocketService.close();
    logout();
  };

  const toggleNotificationModal = () => {
    if (!showNotificationModal) {
      setListNewsfeed([]);
      getListNewsfeed(0);
    }

    setShowNotificationModal(!showNotificationModal);
  };

  const connectSocket = () => {
    if (!WebSocketService.isConnected()) {
      WebSocketService.connect(true);
    }
  };

  const allRead = async () => {
    const response = await pmbcNotificateService.checkAllReaded();

    if (response?.data?.result?.code === "00") {
      MyToastUtils.show({
        type: 'success',
        text2: `Đánh dấu tất cả đã đọc thành công`,
      });

      setCountThongbao(0);
      setShowNotificationModal(false);
    }
  };

  const vaoHop = () => {
    // navigation.navigate('Meeting', { id_cuochopgiaoban: cuocHopGiaoBan?.gid });
  };

  const goTo = (name: string) => {
    navigation.navigate(name as never);
  };

  const openLink = (link: any, params: any) => {
    if (!link)
      return;

    if (params) {
      navigation.navigate(link, params);
    } else {
      navigation.navigate(link);
    }

    setShowNotificationModal(false);
  };

  const openThongBao = async (thongBao: any) => {
    let targetLink = "";
    let params = null;

    if (thongBao.type_noti === 1) {
      let targetLink = "Notifications";
      params = { main_id: thongBao?.gid };
      openLink(targetLink, params);
      changeViewStatus(thongBao);
    } else if (thongBao.type_noti === 2) {
      let targetLink = "Notifications";
      params = { main_id: thongBao?.parent_notiId };
      openLink(targetLink, params);
      changeViewStatus(thongBao);
    } else if (thongBao.type_noti === 3) {
      if (roleMap.has(thongBao.type_noti_lich)) {
        const matchingRole = roleMap
          ?.get(thongBao.type_noti_lich)
          ?.find(
            (role) =>
              listRole.some((r) => r === role.key) ||
              userDetail.chucVu === role.key
          );
        if (matchingRole) {
          targetLink = matchingRole.path;
        }
      } else if (thongBao.type_noti_lich == "dangkylich") {
        targetLink = "";
      } else if (thongBao.type_noti_lich == "duyet-dangkylich") {
        targetLink = "";
      }

      if (thongBao?.main_id) {
        params = { main_id: thongBao?.main_id };
      }
      openLink(targetLink, params);
      changeViewStatus(thongBao);
    }
  };

  const changeViewStatus = async (thongBao: any) => {
    try {
      const response = await pmbcNotificateService.changeViewStatus(thongBao.gid);

      if (response?.data?.result?.code == "00") {
        setCountThongbao(prev => prev - 1 >= 0 ? prev - 1 : 0);
      }
    } catch (error) {
      console.error("error changeViewStatus noti", error);
    } finally {

    }
  };

  const renderMenu = () => (
    <ScrollView
      style={tw`w-full flex-1`}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={false}
      persistentScrollbar={true}
    >
      {menuData.map((menu, index) => (
        <View key={index} style={tw`border-b border-gray-200`}>
          <TouchableOpacity
            style={[
              tw`p-4 py-5 mt-[-1px] flex-row items-center`,
              route.name === menu.route && tw`bg-[#e7effc]`  // Highlight current route
            ]}
            onPress={() => {
              setShowModal(false);
              navigation.navigate(menu.route as never);
            }}
          >
            <Image
              source={menu.icon}
              style={tw`w-6.5 h-6.5`}
            />
            <Text style={[
              tw`font-medium ml-3`,
              route.name === menu.route && tw`text-[#274972]`  // Change text color for current route
            ]}>
              {menu.title}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const onRefresh = React.useCallback(() => {
    // Reset lại route hiện tại để reload toàn bộ màn hình
    navigation.reset({
      index: 0,
      routes: [{ name: route.name as never, params: route.params }],
    });

  }, [navigation, route]);

  return (
    <TouchableWithoutFeedback onPress={() => { /* ẩn bàn phím hoặc reset */ }}>
      <View style={tw`flex-1 bg-[#fff]`}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent" // Android: trong suốt
          translucent={true}           // Android: để nội dung tràn lên status bar
        />

        {/* Main Content */}
        <View style={tw`flex-1 bg-[${COLORS.backgroundColorGray}] pt-12`}>
          {/* <LinearGradient
        colors={['#d2e4d6', '#d7ece9', '#e4f1f5', '#f4f7fc', '#ffffff']}
        start={{ x: 0, y: 0 }} // to left bottom
        end={{ x: 0, y: 1 }}
        style={tw`flex-1 bg-[${COLORS.backgroundColorGray}] pt-6`}
      > */}
          <LinearGradient
            colors={['#005f37', '#007946', '#009456', '#00af67', '#00cc77']}
            start={{ x: 0, y: 0 }} // to left bottom
            end={{ x: 0, y: 1 }}
            style={[
              tw`absolute top-0 left-0 right-0 h-36 rounded-b-3xl`,
              { zIndex: 0 }
            ]}
          />
          <View style={tw`px-4 mb-4 flex-row items-center justify-center `}>
            <View style={tw`flex-1`}></View>
            <View style={tw`flex-4`}>
              <Text style={tw`text-2xl font-bold text-[#fff] text-center`}>
                {menuNameData[route.name as string]}
              </Text>
            </View>
            <View style={tw`flex-1`}>
              {/* <LucideIcon icon={'Bell'} color={COLORS.primary} size={26} strokeWidth={1.5} /> */}
            </View>
          </View>
          <View style={tw`flex-1 pt-0`}>{children}</View>
          {/* </LinearGradient> */}
        </View>

        {/* Modal cho menu */}
        {
          showModal && (
            <Modal
              transparent={true}
              animationType="fade"
              visible={showModal}
              onRequestClose={closeModal}
            >
              <View style={tw`flex-1 flex-row`}>
                <View style={tw`flex-col bg-white relative w-8.5/10 h-full`}>
                  <View>
                    <View style={tw`flex-row px-4 border-b border-gray-200 py-1 items-center gap-x-1`}>
                      <Image
                        source={BTTMImage}
                        style={tw`w-9 h-9`}
                      />
                      <Text style={tw`text-[#a92722] py-3 font-bold text-xl ml-2 uppercase`}>
                        Quản lý sinh viên
                      </Text>
                    </View>
                  </View>

                  <View style={tw`flex-grow-1`}>
                    {renderMenu()}
                  </View>

                  <View style={tw`flex-col justify-center`}>
                    <View style={tw`flex-row py-5 px-4 items-center gap-4 border-t border-gray-200`}>
                      <Image source={manualIcon} style={tw`w-7 h-7`} />
                      <View style={tw`gap-1`}>
                        <Text style={tw`font-bold pb-1 text-[#d7002e]`}>Hướng dẫn sử dụng</Text>
                        <View style={tw`flex-row items-center gap-2`}>
                          <Text style={tw``}>File hướng dẫn:</Text>
                          <TouchableOpacity style={tw`items-center`}>
                            <Text style={tw`text-blue-400 underline`}>Tải xuống</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>

                    <View style={tw`flex-row py-5 px-4 items-center gap-4 border-t border-gray-200`}>
                      <Image source={phoneIcon} style={tw`w-7 h-7`} />
                      <View style={tw`gap-1`}>
                        <Text style={tw`font-bold pb-1 text-[#d7002e]`}>Hỗ trợ</Text>
                        <Text style={tw``}>
                          Số điện thoại: 0965.853.399 (Trần Văn An)
                        </Text>
                      </View>
                    </View>

                    <View style={tw`flex-col gap-1 p-2 items-center bg-[#4c4c4c]`}>
                      <Text style={tw`text-white text-[10px] font-medium uppercase`}>Phần mềm quản lý sinh viên - COPYRIGHT © 2025</Text>
                    </View>
                  </View >
                </View>
                <TouchableOpacity
                  style={tw`w-4/5 bg-black opacity-30`}
                  onPress={closeModal}
                />
              </View>
            </Modal>
          )
        }

        {/* Modal cho thông báo */}
        {
          showNotificationModal && (
            <Modal
              transparent={true}
              animationType="fade"
              visible={showNotificationModal}
              onRequestClose={() => setShowNotificationModal(false)}
            >
              <View style={tw`flex-1 flex-row`}>
                <TouchableOpacity
                  style={tw`w-6/10 bg-black opacity-30`}
                  onPress={() => setShowNotificationModal(false)}
                />
                <View style={tw`bg-white w-4/10 h-full shadow-lg`}>
                  <View style={tw`px-3 h-12 flex-row justify-between items-center border-b-2 border-gray-200 `}>
                    <Text style={tw`text-lg font-medium`}>Thông báo</Text>
                    <TouchableOpacity onPress={() => allRead()}>
                      <Text style={tw`text-blue-500`}>Đánh dấu tất cả đã đọc</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Nội dung thông báo*/}
                  <FlatList
                    data={listNewsfeed}
                    keyExtractor={(item, index) => index.toString()}
                    style={tw`flex-1`}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => {
                      if (isHaveMoreNewsFeed) {
                        getListNewsfeed(pageNewsfeed + 1);
                      }
                    }}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    showsHorizontalScrollIndicator={false}
                    persistentScrollbar={true}
                    renderItem={({ item: notification, index }) => (
                      <NotificationItem
                        notification={notification}
                        listImageNewsFeed={listImageNewsFeed}
                        clickThongBao={(item: any) => {
                          openThongBao(item);
                        }}
                      />
                    )}
                  />

                </View>
              </View>
            </Modal>
          )
        }

        {/* Replace the Modal component with LoadingModal */}
        <LoadingModal visible={isLoading} />
      </View >
    </TouchableWithoutFeedback>
  );
};

export default Layout;
