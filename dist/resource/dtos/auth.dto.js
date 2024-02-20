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
exports.AuthenticateDto = exports.LoginDto = void 0;
const class_validator_1 = require("class-validator");
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsString)({ message: '아이디를 입력해주세요' }),
    __metadata("design:type", String)
], LoginDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '비밀번호를 입력해주세요' }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '소속을 선택해주세요' }),
    __metadata("design:type", String)
], LoginDto.prototype, "provider", void 0);
class AuthenticateDto {
}
exports.AuthenticateDto = AuthenticateDto;
__decorate([
    (0, class_validator_1.IsString)({ message: '엑세스 토큰을 입력해주세요' }),
    __metadata("design:type", String)
], AuthenticateDto.prototype, "token", void 0);
__decorate([
    (0, class_validator_1.IsIn)(['refresh', 'access'], { message: '토큰 타입을 선택해주세요' }),
    __metadata("design:type", String)
], AuthenticateDto.prototype, "tokenType", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: '소속을 선택해주세요' }),
    __metadata("design:type", String)
], AuthenticateDto.prototype, "provider", void 0);
//# sourceMappingURL=auth.dto.js.map