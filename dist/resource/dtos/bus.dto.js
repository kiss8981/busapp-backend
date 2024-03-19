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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusProviderLocationUpdateJoinDto = exports.BackgroundBusLocationUpdate = exports.BusLocationUpdateDto = exports.Location = exports.BusAuthenticateDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class BusAuthenticateDto {
}
exports.BusAuthenticateDto = BusAuthenticateDto;
__decorate([
    (0, class_validator_1.IsString)({
        message: '클라이언트 아이디를 입력해주세요.',
    }),
    __metadata("design:type", String)
], BusAuthenticateDto.prototype, "provider", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: '토큰을 입력해주세요.',
    }),
    __metadata("design:type", String)
], BusAuthenticateDto.prototype, "token", void 0);
class Location {
}
exports.Location = Location;
__decorate([
    (0, class_validator_1.IsString)({
        message: '위도를 입력해주세요.',
    }),
    __metadata("design:type", String)
], Location.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: '경도를 입력해주세요.',
    }),
    __metadata("design:type", String)
], Location.prototype, "longitude", void 0);
class BusLocationUpdateDto {
}
exports.BusLocationUpdateDto = BusLocationUpdateDto;
__decorate([
    (0, class_validator_1.IsString)({
        message: '클라이언트 아이디를 입력해주세요.',
    }),
    __metadata("design:type", String)
], BusLocationUpdateDto.prototype, "busId", void 0);
__decorate([
    (0, class_validator_1.IsJSON)({
        message: '위치 정보를 입력해주세요.',
    }),
    __metadata("design:type", Location)
], BusLocationUpdateDto.prototype, "location", void 0);
class BackgroundBusLocationUpdate {
}
exports.BackgroundBusLocationUpdate = BackgroundBusLocationUpdate;
__decorate([
    (0, class_validator_1.IsString)({
        message: '버스 아이디를 입력해주세요.',
    }),
    __metadata("design:type", String)
], BackgroundBusLocationUpdate.prototype, "busId", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Location),
    __metadata("design:type", Location)
], BackgroundBusLocationUpdate.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: '클라이언트 아이디를 입력해주세요.',
    }),
    __metadata("design:type", String)
], BackgroundBusLocationUpdate.prototype, "providerId", void 0);
class BusProviderLocationUpdateJoinDto {
}
exports.BusProviderLocationUpdateJoinDto = BusProviderLocationUpdateJoinDto;
__decorate([
    (0, class_validator_1.IsString)({
        message: '클라이언트 아이디를 입력해주세요.',
    }),
    __metadata("design:type", String)
], BusProviderLocationUpdateJoinDto.prototype, "providerId", void 0);
//# sourceMappingURL=bus.dto.js.map