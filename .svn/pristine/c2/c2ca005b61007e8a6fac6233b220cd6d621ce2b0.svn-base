import React, { useEffect } from "react";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { useNetwork } from "./src/hooks/useNetwork";
import { Alert } from "react-native";
import { Buffer } from 'buffer';

import { install as installCrypto } from 'react-native-quick-crypto';
installCrypto();
global.Buffer = Buffer;

import { LocaleConfig } from 'react-native-calendars';

// Định nghĩa ngôn ngữ tiếng Việt
LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ],
  monthNamesShort: [
    'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6',
    'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'
  ],
  dayNames: [
    'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư',
    'Thứ năm', 'Thứ sáu', 'Thứ bảy'
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
};

// Set mặc định ngôn ngữ là tiếng Việt
LocaleConfig.defaultLocale = 'vi';

export default function App() {
  // const { checkAuth } = useAuthStore();
  const { isConnected } = useNetwork();
  // const { setupNotifications, processQueue: processNotificationQueue } = useNotification();
  // const { processQueue: processOfflineQueue } = useQueue();

  useEffect(() => {
    const initApp = async () => {
      try {
        // // Check authentication status
        // await checkAuth();

        // // Setup notifications
        // await setupNotifications();

        // Process any queued notifications and offline actions
        if (isConnected) {
          // await processNotificationQueue();
          // await processOfflineQueue();
        } else {
          Alert.alert('Kết nối không thành công', 'Vui lòng kiểm tra lại đường truyền');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to initialize app');
      }
    };

    initApp();
  }, []);

  // Monitor network status changes
  // useEffect(() => {
  //   if (isConnected) {
  //     processOfflineQueue();
  //   }
  // }, [isConnected]);

  return <AppNavigator />;
}
