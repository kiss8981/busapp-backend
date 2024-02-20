import { Socket } from 'socket.io';
export interface SocketResponse<T = any> {
    event: string;
    message: string;
    data: T;
}
export declare const createSocketResponse: (client: Socket, event: string, data: any, message?: string) => void;
