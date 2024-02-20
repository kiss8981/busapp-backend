import { Socket } from 'socket.io';

export interface SocketResponse<T = any> {
  event: string;
  message: string;
  data: T;
}

export const createSocketResponse = (
  client: Socket,
  event: string,
  data: any,
  message?: string,
): void => {
  client.emit(
    event,
    JSON.stringify({
      event,
      data,
      message: message || '요청이 성공적으로 처리되었습니다.',
    }),
  );
};
