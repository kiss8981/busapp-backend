import { IsIn, IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: '아이디를 입력해주세요' })
  id: string;
  @IsString({ message: '비밀번호를 입력해주세요' })
  password: string;
  @IsString({ message: '소속을 선택해주세요' })
  provider: string;
}

export class AuthenticateDto {
  @IsString({ message: '엑세스 토큰을 입력해주세요' })
  token: string;
  @IsIn(['refresh', 'access'], { message: '토큰 타입을 선택해주세요' })
  tokenType: 'refresh' | 'access';
  @IsString({ message: '소속을 선택해주세요' })
  provider: string;
}
