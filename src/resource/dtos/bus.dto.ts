import { IsJSON, IsString } from 'class-validator';

export class BusAuthenticateDto {
  @IsString({
    message: '클라이언트 아이디를 입력해주세요.',
  })
  provider: string;

  @IsString({
    message: '토큰을 입력해주세요.',
  })
  token: string;
}

export class Location {
  @IsString({
    message: '위도를 입력해주세요.',
  })
  latitude: string;

  @IsString({
    message: '경도를 입력해주세요.',
  })
  longitude: string;
}

export class BusLocationUpdateDto {
  @IsString({
    message: '클라이언트 아이디를 입력해주세요.',
  })
  busId: string;

  @IsJSON({
    message: '위치 정보를 입력해주세요.',
  })
  location: Location;
}

export class BusProviderLocationUpdateJoinDto {
  @IsString({
    message: '클라이언트 아이디를 입력해주세요.',
  })
  providerId: string;
}
