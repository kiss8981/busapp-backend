import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthenticateDto, LoginDto } from 'src/resource/dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('providers')
  async getProvider() {
    const proviers = await this.authService.getProviders();
    return proviers;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const loginToken = await this.authService.login(loginDto);
    return loginToken;
  }

  @Post('authenticate')
  async authenticate(@Body() authenticateDto: AuthenticateDto) {
    const authenticate = await this.authService.authenticate(authenticateDto);
    return authenticate;
  }

  @Post('authenticate/refresh')
  async authenticateRefresh(@Body() authenticateDto: AuthenticateDto) {
    const authenticateRefresh =
      await this.authService.authenticateRefresh(authenticateDto);
    return authenticateRefresh;
  }
}
