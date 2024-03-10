import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BusService } from './bus.service';
import { BusAuthenticateDto, BusLocationUpdateDto, BusProviderLocationUpdateJoinDto } from 'src/resource/dtos/bus.dto';
export declare class BusGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly busService;
    constructor(busService: BusService);
    server: Server;
    private logger;
    handleAuthenticateEvent(data: BusAuthenticateDto, client: Socket): Promise<void>;
    handleLocationUpdateEvent(data: BusLocationUpdateDto, client: Socket): Promise<void>;
    handleProviderLocationUpdateJoinEvent(data: BusProviderLocationUpdateJoinDto, client: Socket): Promise<void>;
    afterInit(): void;
    handleDisconnect(): void;
    handleConnection(): void;
}
