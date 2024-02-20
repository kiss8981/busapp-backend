import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticateDto, LoginDto } from 'src/resource/dtos/auth.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    private logger;
    private saltRounds;
    getProviders(): Promise<{
        id: string;
        name: string;
    }[]>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    authenticate(authenticateDto: AuthenticateDto): Promise<User>;
    authenticateRefresh(authenticateDto: AuthenticateDto): Promise<User & {
        accessToken: string;
        refreshToken: string;
    }>;
    getJwtToken(user: User, tokenType: 'refresh' | 'access'): string;
    validationToken(token: string, tokenType: 'refresh' | 'access'): Promise<{
        sub: string;
        tokenType: 'refresh' | 'access';
    }>;
}
