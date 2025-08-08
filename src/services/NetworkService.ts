import NetInfo from '@react-native-community/netinfo';
import { create } from 'zustand';

interface NetworkState {
  isConnected: boolean;
  setIsConnected: (status: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  isConnected: true,
  setIsConnected: (status) => set({ isConnected: status }),
}));

export class NetworkService {
  static async initialize() {
    // Initial network check
    const status = await NetInfo.fetch();
    useNetworkStore.getState().setIsConnected(!!status.isConnected);

    // Subscribe to network changes
    NetInfo.addEventListener(state => {
      useNetworkStore.getState().setIsConnected(!!state.isConnected);
    });
  }

  static isConnected() {
    return useNetworkStore.getState().isConnected;
  }
}