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
exports.BusGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const bus_service_1 = require("./bus.service");
const bus_dto_1 = require("../resource/dtos/bus.dto");
const socket_response_1 = require("../utils/socket.response");
let BusGateway = class BusGateway {
    constructor(busService) {
        this.busService = busService;
        this.logger = new common_1.Logger('BusGateway');
    }
    async handleAuthenticateEvent(data, client) {
        try {
            const isAthenticate = await this.busService.authenticate(client, data.provider, data.token);
            (0, socket_response_1.createSocketResponse)(client, 'authenticate', isAthenticate);
        }
        catch (error) {
            this.logger.error(error);
            (0, socket_response_1.createSocketResponse)(client, 'authenticate', false, error.message);
        }
    }
    async handleLocationUpdateEvent(data, client) {
        try {
            await this.busService.locationUpdate(this.server, client.id, data);
        }
        catch (error) {
            this.logger.error(error);
            (0, socket_response_1.createSocketResponse)(client, 'locationupdate', null, error.message);
        }
    }
    async handleProviderLocationUpdateJoinEvent(data, client) {
        try {
            const locations = await this.busService.providerLocationUpdateJoin(client, data);
            (0, socket_response_1.createSocketResponse)(client, 'providerjoin', locations);
        }
        catch (error) {
            this.logger.error(error);
            (0, socket_response_1.createSocketResponse)(client, 'providerjoin', null, error.message);
        }
    }
    afterInit() {
        this.logger.log('BusGateway Initialized');
    }
    handleDisconnect(client) {
        this.logger.log(`Client Disconnected : ${client.id}`);
    }
    handleConnection(client) {
        this.busService.disconnect(client.id);
        this.logger.log(`Client Connected : ${client.id}`);
    }
};
exports.BusGateway = BusGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], BusGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('authenticate'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bus_dto_1.BusAuthenticateDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], BusGateway.prototype, "handleAuthenticateEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('locationupdate'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bus_dto_1.BusLocationUpdateDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], BusGateway.prototype, "handleLocationUpdateEvent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('providerjoin'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bus_dto_1.BusProviderLocationUpdateJoinDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], BusGateway.prototype, "handleProviderLocationUpdateJoinEvent", null);
exports.BusGateway = BusGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3001, {
        namespace: 'bus',
        cors: { origin: ['*:*', 'http://localhost:3002'] },
    }),
    __metadata("design:paramtypes", [bus_service_1.BusService])
], BusGateway);
//# sourceMappingURL=bus.gateway.js.map