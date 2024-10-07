import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'socket',
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('A user connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('A user disconnected:', client.id);
    client.emit('data', 'sds');
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string): void {
    console.log('message received');
    client.broadcast.emit('message', message);
  }

  @SubscribeMessage('join')
  joinRoom(client: Socket, data: { roomName: string; userName: string }): void {
    console.log('Joined room', data);
    client.join(data.roomName);
  }
}
