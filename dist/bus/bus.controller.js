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
exports.BusController = void 0;
const common_1 = require("@nestjs/common");
const bus_dto_1 = require("../resource/dtos/bus.dto");
const bus_service_1 = require("./bus.service");
const bus_gateway_1 = require("./bus.gateway");
let BusController = class BusController {
    constructor(busService, busGateway) {
        this.busService = busService;
        this.busGateway = busGateway;
    }
    async login(locationDto, authorization) {
        const loginToken = await this.busService.backgroundBusLocationUpdate(this.busGateway.server, authorization, locationDto);
        return loginToken;
    }
};
exports.BusController = BusController;
__decorate([
    (0, common_1.Post)('location'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bus_dto_1.BackgroundBusLocationUpdate, String]),
    __metadata("design:returntype", Promise)
], BusController.prototype, "login", null);
exports.BusController = BusController = __decorate([
    (0, common_1.Controller)('bus'),
    __metadata("design:paramtypes", [bus_service_1.BusService,
        bus_gateway_1.BusGateway])
], BusController);
//# sourceMappingURL=bus.controller.js.map