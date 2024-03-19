"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusModule = void 0;
const common_1 = require("@nestjs/common");
const bus_gateway_1 = require("./bus.gateway");
const bus_service_1 = require("./bus.service");
const prisma_service_1 = require("../prisma/prisma.service");
const auth_service_1 = require("../auth/auth.service");
const auth_module_1 = require("../auth/auth.module");
const bus_controller_1 = require("./bus.controller");
let BusModule = class BusModule {
};
exports.BusModule = BusModule;
exports.BusModule = BusModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule],
        providers: [bus_gateway_1.BusGateway, bus_service_1.BusService, prisma_service_1.PrismaService, auth_service_1.AuthService],
        controllers: [bus_controller_1.BusController],
    })
], BusModule);
//# sourceMappingURL=bus.module.js.map