import { Redis } from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';
import { Socket, Server } from 'socket.io';
import { BusLocationUpdateDto, BusProviderLocationUpdateJoinDto } from 'src/resource/dtos/bus.dto';
import { AuthService } from 'src/auth/auth.service';
export declare class BusService {
    private readonly client;
    private readonly prisma;
    private readonly authService;
    constructor(client: Redis, prisma: PrismaService, authService: AuthService);
    authenticate(client: Socket, providerId: string, token: string): Promise<boolean>;
    locationUpdate(server: Server, clientId: string, data: BusLocationUpdateDto): Promise<void>;
    getBusLocations(providerId: string): Promise<any[]>;
    providerLocationUpdateJoin(client: Socket, data: BusProviderLocationUpdateJoinDto): Promise<any[]>;
    disconnect(clientId: string): Promise<boolean>;
}
