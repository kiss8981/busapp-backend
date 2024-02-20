export declare class LoginDto {
    id: string;
    password: string;
    provider: string;
}
export declare class AuthenticateDto {
    token: string;
    tokenType: 'refresh' | 'access';
    provider: string;
}
