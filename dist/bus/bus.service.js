"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusService = void 0;
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
const prisma_service_1 = require("../prisma/prisma.service");
const auth_service_1 = require("../auth/auth.service");
let BusService = class BusService {
    constructor(client, prisma, authService) {
        this.client = client;
        this.prisma = prisma;
        this.authService = authService;
    }
    async authenticate(client, providerId, token) {
        const isAuthenticate = await this.client.get(`authenticate:${client.id}`);
        if (isAuthenticate)
            return true;
        const provider = await this.prisma.provider.findUnique({
            where: { id: providerId },
        });
        if (!provider)
            throw new Error('찾을 수 없는 클라이언트입니다.');
        try {
            const checkToken = await this.authService.authenticate({
                token: token,
                tokenType: 'access',
                provider: providerId,
            });
            if (!checkToken)
                throw new Error('인증에 실패했습니다.');
            client.join(providerId);
            await this.client.set(`bus:${client.id}`, providerId, 'EX', 60 * 60 * 3);
            return true;
        }
        catch (error) {
            if (error.response.status === 401) {
                throw new Error('인증에 실패했습니다.');
            }
            else {
                throw new Error('서버 에러가 발생했습니다.');
            }
        }
    }
    async locationUpdate(server, clientId, data) {
        const providerId = await this.client.get(`bus:${clientId}`);
        if (!providerId)
            throw new Error('인증되지 않은 클라이언트입니다.');
        await this.client.set(`bus:${providerId}:${data.busId}:lastlocation`, JSON.stringify(data), 'EX', 60 * 60 * 3);
        server.to(providerId).emit('locationupdate', data);
    }
    async getBusLocations(providerId) {
        const keys = await this.client.keys(`bus:${providerId}:*`);
        if (keys.length === 0)
            return [];
        const locations = await this.client.mget(keys);
        return locations.map((location) => JSON.parse(location));
    }
    async providerLocationUpdateJoin(client, data) {
        const provider = await this.prisma.provider.findUnique({
            where: { id: data.providerId },
        });
        if (!provider)
            throw new Error('찾을 수 없는 클라이언트입니다.');
        client.join(data.providerId);
        const locations = await this.getBusLocations(data.providerId);
        return locations;
    }
    async disconnect(clientId) {
        const keys = await this.client.keys(`bus:${clientId}`);
        if (keys.length === 0)
            return false;
        await this.client.del(keys);
        return true;
    }
    async backgroundBusLocationUpdate(server, accessToken, location) {
        const isAuthenticate = await this.client.get(`authenticate:${accessToken}`);
        if (!isAuthenticate) {
            const provider = await this.prisma.provider.findUnique({
                where: { id: location.providerId },
            });
            if (!provider)
                throw new Error('찾을 수 없는 클라이언트입니다.');
            try {
                const checkToken = await this.authService.authenticate({
                    token: accessToken,
                    tokenType: 'access',
                    provider: location.providerId,
                });
                if (!checkToken)
                    throw new Error('인증에 실패했습니다.');
                await this.client.set(`authenticate:${accessToken}`, 'true', 'EX', 60 * 60 * 5);
            }
            catch (error) {
                if (error.response.status === 401) {
                    throw new Error('인증에 실패했습니다.');
                }
                else {
                    throw new Error('서버 에러가 발생했습니다.');
                }
            }
        }
        await this.client.set(`bus:${location.providerId}:${location.busId}:lastlocation`, JSON.stringify(location), 'EX', 60 * 60 * 3);
        server.to(location.providerId).emit('locationupdate', location);
        return true;
    }
};
exports.BusService = BusService;
exports.BusService = BusService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_redis_1.InjectRedis)()),
    __metadata("design:paramtypes", [ioredis_1.Redis,
        prisma_service_1.PrismaService,
        auth_service_1.AuthService])
], BusService);
//# sourceMappingURL=bus.service.js.map