import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BusService } from './bus.service';
import {
  BusAuthenticateDto,
  BusLocationUpdateDto,
  BusProviderLocationUpdateJoinDto,
} from 'src/resource/dtos/bus.dto';
import { createSocketResponse } from 'src/utils/socket.response';

@WebSocketGateway(3001, {
  namespace: 'bus',
  cors: { origin: ['*:*', 'http://localhost:3002'] },
})
export class BusGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly busService: BusService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('BusGateway');

  @SubscribeMessage('authenticate')
  async handleAuthenticateEvent(
    @MessageBody() data: BusAuthenticateDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const isAthenticate = await this.busService.authenticate(
        client,
        data.provider,
        data.token,
      );
      createSocketResponse(client, 'authenticate', isAthenticate);
      this.logger.log(`Authenticate : ${client.id} - ${data.provider}`);
    } catch (error: any) {
      this.logger.error(error);
      createSocketResponse(client, 'authenticate', false, error.message);
    }
  }

  @SubscribeMessage('locationupdate')
  async handleLocationUpdateEvent(
    @MessageBody() data: BusLocationUpdateDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      await this.busService.locationUpdate(this.server, client.id, data);
      this.logger.log(`Location Update : ${client.id} - ${data.busId}`);
    } catch (error: any) {
      this.logger.error(error);
      createSocketResponse(client, 'locationupdate', null, error.message);
    }
  }

  @SubscribeMessage('providerjoin')
  async handleProviderLocationUpdateJoinEvent(
    @MessageBody() data: BusProviderLocationUpdateJoinDto,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    try {
      const locations = await this.busService.providerLocationUpdateJoin(
        client,
        data,
      );
      createSocketResponse(client, 'providerjoin', locations);
    } catch (error: any) {
      this.logger.error(error);
      createSocketResponse(client, 'providerjoin', null, error.message);
    }
  }

  afterInit() {
    this.logger.log('BusGateway Initialized');
  }

  handleDisconnect() {
    // this.logger.log(`Client Disconnected : ${client.id}`);
  }

  handleConnection() {
    // this.logger.log(`Client Connected : ${client.id}`);
  }
}
