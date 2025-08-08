import React, { createContext, useContext, useState, useEffect } from 'react';

import FileUtils from '../utils/fileUtils';
import { PmbcUserService } from '../services/appService/user/user.service';
import { RoleService } from '../services/appService/role';
import { SignalService } from '../services/signal/signal.service';
import { SystemSettingsService } from '../services/appService/systemsettings';


interface UserContextType {
  userDetail: any;
  systemSetting: any;
  listRole: any[];
  listFeature: any[];
  loading: boolean;
  error: any;
  refreshUserDetail: () => Promise<void>;
  listImageGlobal: { [key: string]: any };
  setListImageGlobal: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userDetail, setUserDetail] = useState<any>(null);
  const [systemSetting, setSystemSetting] = useState<any>(null);
  const [listRole, setListRole] = useState<any[]>([]);
  const [listFeature, setListFeature] = useState<any[]>([]);
  const [listImageGlobal, setListImageGlobal] = React.useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const pmbcUserService = PmbcUserService.getInstance();
  const roleService = RoleService.getInstance();
  const signalService = SignalService.getInstance();
  const systemSettingsService = SystemSettingsService.getInstance();

  const fetchUserDetail = async () => {
    try {
      setLoading(true);

      const [
        responseUser,
        //  responseSystemSetting
      ] = await Promise.all([
        pmbcUserService.getUserDetail(),
        // systemSettingsService.getListObjs()
      ]);

      if (responseUser.status === 200) {
        const userDetail = responseUser.data.detail;
        setUserDetail(userDetail);
        setListFeature(responseUser.data.listFeature);
        FileUtils.loadListImage([userDetail], 'image', listImageGlobal, setListImageGlobal);

        const responseRole = await roleService.getByUser(userDetail.username);
        const listRole = responseRole?.data?.listRole;
        setListRole(listRole.map((item: any) => item.roleKey));

        // Thiết lập hoặc tạo key Signal
        // if (userDetail.key_signal) {
        //   signalService.setKeyBundle(userDetail.key_signal);
        // } else {
        //   try {
        //     await signalService.generatePreKeyBundleForUser(userDetail.userId);
        //   } catch (error) {
        //     console.error("error generatePreKeyBundleForUser", error);
        //   }
        // }
      }

      // if (responseSystemSetting.status === 200) {
      //   const obj = responseSystemSetting.data.lstSystemSettings[0];
      //   setSystemSetting(obj);
      // }
    } catch (err) {
      setError(err);
      console.error("Error fetching user details or system settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const refreshUserDetail = async () => {
    await fetchUserDetail();
  };

  return (
    <UserContext.Provider value={{
      userDetail,
      systemSetting,
      listRole,
      listFeature,
      loading,
      error,
      refreshUserDetail,
      listImageGlobal,
      setListImageGlobal
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 
