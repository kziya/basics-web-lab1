import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import configuration from './config/configuration';

export type SocketContextType = {
  socket: Socket;
} | null;
const SocketContext = createContext<SocketContextType>(null);

export const useSocket = (): { socket: Socket } => {
  const context = useContext(SocketContext);

  if (context == null) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const socket = io(configuration.SOCKET_URL, {
    autoConnect: true,
    path: '/chat',
  });

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      <h1>{children}</h1>
    </SocketContext.Provider>
  );
};
