import React, { createContext, useContext, useEffect, useRef } from 'react';
import WebSocketService from '../services/WebSocketService';

interface WebSocketContextType {
  connect: () => void;
  disconnect: () => void;
  subscribeSocket: (callback: (data: any) => void) => () => void;
  isSocketConnected: boolean;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const handlers = useRef<Set<(data: any) => void>>(new Set());
  const [socket, setSocket] = React.useState<WebSocket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = React.useState(false);

  useEffect(() => {
    WebSocketService.connect();
    // const socket = WebSocketService.getSocket();

    // const handleMessage = (event: MessageEvent) => {

    //   let socketData = null;
    //   try {
    //     socketData = JSON.parse(event.data);
    //   } catch (error) {
    //     socketData = event.data;
    //   }

    //   // Gọi tất cả callbacks đã đăng ký
    //   handlers.current.forEach(callback => {
    //     try {
    //       callback(socketData);
    //     } catch (error) {
    //       console.error('Error in websocket handler:', error);
    //     }
    //   });
    // };

    // if (socket) {
    //   socket.onmessage = handleMessage;
    // } else {
    //   console.error('WebSocket không hợp lệ');
    // }

    WebSocketService.setOnSocketChange((newSocket) => {
      setSocket(newSocket);

      if (newSocket) {
        const connected = newSocket?.readyState === WebSocket.OPEN
        setIsSocketConnected(connected);

        newSocket.onmessage = (event: MessageEvent) => {
          let socketData = null;
          try {
            socketData = JSON.parse(event.data);
          } catch (error) {
            socketData = event.data;
          }

          handlers.current.forEach(callback => {
            try {
              callback(socketData);
            } catch (error) {
              console.error('Error in websocket handler:', error);
            }
          });
        };
      }
    });

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const subscribeSocket = (callback: (data: any) => void) => {
    handlers.current.add(callback);
    return () => {
      handlers.current.delete(callback);
    };
  };

  return (
    <WebSocketContext.Provider value={{
      connect: WebSocketService.connect,
      disconnect: WebSocketService.close,
      subscribeSocket,
      isSocketConnected
    }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook để dễ sử dụng
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
