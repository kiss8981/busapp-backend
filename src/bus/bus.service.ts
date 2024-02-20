import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';
import { Socket, Server } from 'socket.io';
import {
  BusLocationUpdateDto,
  BusProviderLocationUpdateJoinDto,
} from 'src/resource/dtos/bus.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class BusService {
  constructor(
    @InjectRedis() private readonly client: Redis,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async authenticate(
    client: Socket,
    providerId: string,
    token: string,
  ): Promise<boolean> {
    const isAuthenticate = await this.client.get(`authenticate:${client.id}`);

    if (isAuthenticate) return true;

    const provider = await this.prisma.provider.findUnique({
      where: { id: providerId },
    });

    if (!provider) throw new Error('찾을 수 없는 클라이언트입니다.');

    try {
      const checkToken = await this.authService.authenticate({
        token: token,
        tokenType: 'access',
        provider: providerId,
      });

      if (!checkToken) throw new Error('인증에 실패했습니다.');

      client.join(providerId);

      await this.client.set(`bus:${client.id}`, providerId, 'EX', 60 * 60 * 3);

      return true;
    } catch (error) {
      if (error.response.status === 401) {
        throw new Error('인증에 실패했습니다.');
      } else {
        throw new Error('서버 에러가 발생했습니다.');
      }
    }
  }

  async locationUpdate(
    server: Server,
    clientId: string,
    data: BusLocationUpdateDto,
  ): Promise<void> {
    const providerId = await this.client.get(`bus:${clientId}`);
    if (!providerId) throw new Error('인증되지 않은 클라이언트입니다.');
    await this.client.set(
      `bus:${providerId}:${data.busId}:lastlocation`,
      JSON.stringify(data),
      'EX',
      60 * 60 * 3,
    );
    server.to(providerId).emit('locationupdate', data);
  }

  async getBusLocations(providerId: string): Promise<any[]> {
    const keys = await this.client.keys(`bus:${providerId}:*`);

    if (keys.length === 0) return [];
    const locations = await this.client.mget(keys);

    return locations.map((location) => JSON.parse(location));
  }

  async providerLocationUpdateJoin(
    client: Socket,
    data: BusProviderLocationUpdateJoinDto,
  ): Promise<any[]> {
    const provider = await this.prisma.provider.findUnique({
      where: { id: data.providerId },
    });

    if (!provider) throw new Error('찾을 수 없는 클라이언트입니다.');

    client.join(data.providerId);

    const locations = await this.getBusLocations(data.providerId);

    return locations;
  }

  async disconnect(clientId: string): Promise<boolean> {
    const keys = await this.client.keys(`bus:${clientId}`);

    if (keys.length === 0) return false;

    await this.client.del(keys);

    return true;
  }
}
