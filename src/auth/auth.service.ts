import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthenticateDto, LoginDto } from 'src/resource/dtos/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  private logger: Logger = new Logger('AuthService');
  private saltRounds = 10;

  async getProviders() {
    const providers = await this.prisma.provider.findMany();

    return providers;
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: loginDto.id,
      },
    });

    if (!user) throw new NotFoundException('찾을 수 없는 사용자 정보입니다.');

    const checkPassword = await new Promise((resolve, reject) => {
      bcrypt.compare(loginDto.password, user.password, (err, result) => {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result);
        } else {
          reject(new UnauthorizedException('비밀번호가 일치하지 않습니다.'));
        }
      });
    });

    if (!checkPassword) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const accessToken = this.getJwtToken(user, 'access');
    const refreshToken = this.getJwtToken(user, 'refresh');

    return {
      accessToken,
      refreshToken,
    };
  }

  async authenticate(authenticateDto: AuthenticateDto): Promise<User> {
    try {
      const authenticate = await this.validationToken(
        authenticateDto.token,
        authenticateDto.tokenType,
      );

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
        throw new UnauthorizedException('인증에 실패했습니다.');
      }

      if (authenticateUser.providerId !== authenticateDto.provider) {
        throw new UnauthorizedException('인증에 실패했습니다.');
      }

      return {
        ...authenticateUser,
        password: undefined,
      };
    } catch (error) {
      throw error;
    }
  }

  async authenticateRefresh(authenticateDto: AuthenticateDto): Promise<
    User & {
      accessToken: string;
      refreshToken: string;
    }
  > {
    try {
      const authenticate = await this.validationToken(
        authenticateDto.token,
        authenticateDto.tokenType,
      );

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
        throw new UnauthorizedException('인증에 실패했습니다.');
      }

      if (authenticateUser.providerId !== authenticateDto.provider) {
        throw new UnauthorizedException('인증에 실패했습니다.');
      }

      const accessToken = this.getJwtToken(authenticateUser, 'access');
      const refreshToken = this.getJwtToken(authenticateUser, 'refresh');

      return {
        ...authenticateUser,
        password: undefined,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  getJwtToken(user: User, tokenType: 'refresh' | 'access'): string {
    const payload = { sub: user.id, provider: user.providerId, tokenType };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: tokenType === 'access' ? '3h' : '7d',
    });
  }

  public async validationToken(
    token: string,
    tokenType: 'refresh' | 'access',
  ): Promise<{
    sub: string;
    tokenType: 'refresh' | 'access';
  }> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      if (payload.tokenType !== tokenType) {
        throw new UnauthorizedException('잘못된 토큰입니다.');
      }

      return payload;
    } catch (error: any) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('토큰이 만료되었습니다.');
      } else {
        throw new UnauthorizedException('토큰이 유효하지 않습니다.');
      }
    }
  }
}
