import create from 'zustand';
import axios from '../services/axios';

interface DataState {
  data: any[];
  isLoading: boolean;
  error: string | null;
  cache: { [key: string]: { data: any; timestamp: number } };
  fetchData: () => Promise<void>;
  updateData: (id: string, updates: any) => Promise<void>;
  clearCache: () => void;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useDataStore = create<DataState>((set, get) => ({
  data: [],
  isLoading: false,
  error: null,
  cache: {},

  fetchData: async () => {
    try {
      set({ isLoading: true, error: null });
      
      // Check cache first
      const cachedData = get().cache['mainData'];
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        set({ data: cachedData.data, isLoading: false });
        return;
      }

      const response = await axios.get('/api/data');
      const newData = response.data;
      
      // Update cache
      const cache = get().cache;
      cache['mainData'] = { data: newData, timestamp: Date.now() };
      
      set({ data: newData, isLoading: false, cache });
    } catch (error) {
      set({ error: 'Failed to fetch data', isLoading: false });
    }
  },

  updateData: async (id: string, updates: any) => {
    try {
      const response = await axios.put(`/api/data/${id}`, updates);
      const updatedItem = response.data;
      
      set(state => ({
        data: state.data.map(item => 
          item.id === id ? updatedItem : item
        )
      }));
    } catch (error) {
      set({ error: 'Failed to update data' });
    }
  },

  clearCache: () => {
    set({ cache: {} });
  },
}));