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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('AuthService');
        this.saltRounds = 10;
    }
    async getProviders() {
        const providers = await this.prisma.provider.findMany();
        return providers;
    }
    async login(loginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: loginDto.id,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('찾을 수 없는 사용자 정보입니다.');
        const checkPassword = await new Promise((resolve, reject) => {
            bcrypt.compare(loginDto.password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                }
                if (result) {
                    resolve(result);
                }
                else {
                    reject(new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다.'));
                }
            });
        });
        if (!checkPassword) {
            throw new common_1.UnauthorizedException('비밀번호가 일치하지 않습니다.');
        }
        const accessToken = this.getJwtToken(user, 'access');
        const refreshToken = this.getJwtToken(user, 'refresh');
        return {
            accessToken,
            refreshToken,
        };
    }
    async authenticate(authenticateDto) {
        try {
            const authenticate = await this.validationToken(authenticateDto.token, authenticateDto.tokenType);
            const authenticateUser = await this.prisma.user.findUnique({
                where: {
                    id: authenticate.sub,
                },
                include: {
                    provider: {
                        include: {
                            route: true,
                        },
                    },
                },
            });
            if (!authenticateUser) {
                throw new common_1.UnauthorizedException('인증에 실패했습니다.');
            }
            if (authenticateUser.providerId !== authenticateDto.provider) {
                throw new common_1.UnauthorizedException('인증에 실패했습니다.');
            }
            return {
                ...authenticateUser,
                password: undefined,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async authenticateRefresh(authenticateDto) {
        try {
            const authenticate = await this.validationToken(authenticateDto.token, authenticateDto.tokenType);
            const authenticateUser = await this.prisma.user.findUnique({
                where: {
                    id: authenticate.sub,
                },
                include: {
                    provider: {
                        include: {
                            route: true,
                        },
                    },
                },
            });
            if (!authenticateUser) {
                throw new common_1.UnauthorizedException('인증에 실패했습니다.');
            }
            if (authenticateUser.providerId !== authenticateDto.provider) {
                throw new common_1.UnauthorizedException('인증에 실패했습니다.');
            }
            const accessToken = this.getJwtToken(authenticateUser, 'access');
            const refreshToken = this.getJwtToken(authenticateUser, 'refresh');
            return {
                ...authenticateUser,
                password: undefined,
                accessToken,
                refreshToken,
            };
        }
        catch (error) {
            throw error;
        }
    }
    getJwtToken(user, tokenType) {
        const payload = { sub: user.id, provider: user.providerId, tokenType };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: tokenType === 'access' ? '3h' : '7d',
        });
    }
    async validationToken(token, tokenType) {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_SECRET,
            });
            if (payload.tokenType !== tokenType) {
                throw new common_1.UnauthorizedException('잘못된 토큰입니다.');
            }
            return payload;
        }
        catch (error) {
            if (error instanceof jwt_1.TokenExpiredError) {
                throw new common_1.UnauthorizedException('토큰이 만료되었습니다.');
            }
            else {
                throw new common_1.UnauthorizedException('토큰이 유효하지 않습니다.');
            }
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map