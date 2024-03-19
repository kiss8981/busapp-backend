import { Body, Controller, Headers, Post } from '@nestjs/common';
import { BackgroundBusLocationUpdate } from 'src/resource/dtos/bus.dto';
import { BusService } from './bus.service';
import { BusGateway } from './bus.gateway';

@Controller('bus')
export class BusController {
  constructor(
    private readonly busService: BusService,
    private readonly busGateway: BusGateway,
  ) {}

  @Post('location')
  async login(
    @Body() locationDto: BackgroundBusLocationUpdate,
    @Headers('Authorization') authorization: string,
  ) {
    const loginToken = await this.busService.backgroundBusLocationUpdate(
      this.busGateway.server,
      authorization,
      locationDto,
    );
    return loginToken;
  }
}
