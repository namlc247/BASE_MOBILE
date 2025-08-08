import React, { createContext, useContext, useEffect } from 'react';
import { useNewsfeed } from './NewsfeedContext';


interface IntervalContextType {
  cuocHopGiaoBan: any | null;
  setCuocHopGiaoBan: React.Dispatch<React.SetStateAction<any>>;
  isShowChgb: boolean;
  currentRoute?: string;
  setCurrentRoute: (route: string) => void;
}

const IntervalContext = createContext<IntervalContextType | undefined>(undefined);

export const IntervalProvider = ({ children }: { children: React.ReactNode }) => {
  const [cuocHopGiaoBan, setCuocHopGiaoBan] = React.useState<any | null>(null);
  const [isShowChgb, setIsShowChgb] = React.useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = React.useState<string>('');
  const { getListNewsfeedByTime } = useNewsfeed();


  useEffect(() => {
    // Initial fetch

    // const intervalId = setInterval(() => {
    //   getListNewsfeedByTime();
    // }, 5000);

    // return () => clearInterval(intervalId);
  }, [currentRoute]);

  return (
    <IntervalContext.Provider value={{
      cuocHopGiaoBan,
      setCuocHopGiaoBan,
      isShowChgb,
      currentRoute,
      setCurrentRoute
    }}>
      {children}
    </IntervalContext.Provider>
  );
};

export const useInterval = () => {
  const context = useContext(IntervalContext);
  if (context === undefined) {
    throw new Error('useInterval must be used within an IntervalProvider');
  }
  return context;
};
