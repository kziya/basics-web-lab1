import React, { createContext, ReactNode, useContext } from 'react';
import { Socket } from 'socket.io-client';

export type SocketContextType = Socket | null;
const SocketContext = createContext<SocketContextType>(null);

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);

  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};

export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <h1>{children}</h1>
    </div>
  );
};
