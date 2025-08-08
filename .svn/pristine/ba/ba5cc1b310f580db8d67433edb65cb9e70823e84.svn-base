import * as Notifications from 'expo-notifications';
import * as Network from 'expo-network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';

export const useNotification = () => {
  const setupNotifications = useCallback(async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      return false;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    return token;
  }, []);

  const handleNotification = useCallback(async (notification: any) => {
    const networkState = await Network.getNetworkStateAsync();
    
    if (networkState.isConnected) {
      await sendNotificationToServer(notification);
    } else {
      await queueNotification(notification);
    }
  }, []);

  const queueNotification = useCallback(async (notification: any) => {
    const queue = await AsyncStorage.getItem('notificationQueue');
    const notifications = queue ? JSON.parse(queue) : [];
    notifications.push(notification);
    await AsyncStorage.setItem('notificationQueue', JSON.stringify(notifications));
  }, []);

  const sendNotificationToServer = useCallback(async (notification: any) => {
    // Implement server communication logic here
  }, []);

  const processQueue = useCallback(async () => {
    const networkState = await Network.getNetworkStateAsync();
    if (!networkState.isConnected) return;

    const queue = await AsyncStorage.getItem('notificationQueue');
    if (!queue) return;

    const notifications = JSON.parse(queue);
    for (const notification of notifications) {
      await sendNotificationToServer(notification);
    }

    await AsyncStorage.removeItem('notificationQueue');
  }, []);

  return {
    setupNotifications,
    handleNotification,
    processQueue
  };
};