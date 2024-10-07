import React, { createContext, ReactNode, useContext, useState } from 'react';

// Define the context type
interface ChatContextType {
  roomName: string;
  userName: string;
  setRoomName: (name: string) => void;
  setUserName: (name: string) => void;
}

// Create context with default values
const ChatContext = createContext<ChatContextType>({
  roomName: '',
  userName: '',
  setRoomName: () => null,
  setUserName: () => null,
});
export const useChat = (): ChatContextType => {
  return useContext(ChatContext);
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [roomName, setRoomName] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  return (
    <ChatContext.Provider
      value={{ roomName, userName, setRoomName, setUserName }}
    >
      <h1>{children}</h1>
    </ChatContext.Provider>
  );
};
