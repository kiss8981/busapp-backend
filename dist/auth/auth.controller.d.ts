import { AuthService } from './auth.service';
import { AuthenticateDto, LoginDto } from 'src/resource/dtos/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    getProvider(): Promise<{
        id: string;
        name: string;
    }[]>;
    login(loginDto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    authenticate(authenticateDto: AuthenticateDto): Promise<{
        id: string;
        password: string;
        providerId: string;
    }>;
    authenticateRefresh(authenticateDto: AuthenticateDto): Promise<{
        id: string;
        password: string;
        providerId: string;
    } & {
        accessToken: string;
        refreshToken: string;
    }>;
}
