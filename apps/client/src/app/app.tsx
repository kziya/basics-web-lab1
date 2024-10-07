// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { SocketProvider } from './socketContext';
import { Route, Routes } from 'react-router-dom';
import { Main } from './pages/main/Main';
import { Chat } from './pages/chat/Chat';
import { ChatProvider } from './chatContext';

export function App() {
  return (
    <ChatProvider>
      <SocketProvider>
        <Routes>
          <Route path={'/chat'} element={<Chat />} />
        </Routes>
      </SocketProvider>
      <Routes>
        <Route path={'/'} element={<Main />} />
      </Routes>
    </ChatProvider>
  );
}

export default App;
