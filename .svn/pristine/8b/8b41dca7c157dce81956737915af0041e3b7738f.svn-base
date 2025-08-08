import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback } from 'react';
import { useDataStore } from '../stores/dataStore';

interface QueueItem {
  id: string;
  action: string;
  data: any;
  timestamp: number;
}

const QUEUE_KEY = '@queue';

export const useQueue = () => {
  const updateData = useDataStore((state) => state.updateData);

  const getQueue = useCallback(async (): Promise<QueueItem[]> => {
    const queue = await AsyncStorage.getItem(QUEUE_KEY);
    return queue ? JSON.parse(queue) : [];
  }, []);

  const addToQueue = useCallback(async (action: string, data: any) => {
    const queue = await getQueue();
    const queueItem: QueueItem = {
      id: Math.random().toString(36).substr(2, 9),
      action,
      data,
      timestamp: Date.now(),
    };
    queue.push(queueItem);
    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  }, [getQueue]);

  const processQueue = useCallback(async () => {
    const queue = await getQueue();
    if (queue.length === 0) return;

    for (const item of queue) {
      try {
        switch (item.action) {
          case 'UPDATE_DATA':
            await updateData(item.data.id, item.data.updates);
            break;
          // Add other action types as needed
        }
      } catch (error) {
        // console.error('Error processing queue item:', error);
        continue;
      }
    }

    await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify([]));
  }, [getQueue, updateData]);

  return {
    addToQueue,
    processQueue
  };
};
