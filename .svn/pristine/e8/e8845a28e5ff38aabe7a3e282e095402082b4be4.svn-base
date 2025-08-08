import { create } from 'zustand';
import NetInfo from '@react-native-community/netinfo';
import { useEffect, useCallback } from 'react';

interface NetworkState {
  isConnected: boolean;
  setIsConnected: (status: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isConnected: true,
  setIsConnected: (status) => set({ isConnected: status }),
}));

export const useNetwork = () => {
  const setIsConnected = useNetworkStore((state) => state.setIsConnected);

  const initialize = useCallback(async () => {
    const status = await NetInfo.fetch();
    setIsConnected(!!status.isConnected);
  }, [setIsConnected]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(!!state.isConnected);
    });

    initialize();

    return () => {
      unsubscribe();
    };
  }, [initialize]);

  return {
    isConnected: useNetworkStore((state) => state.isConnected)
  };
};