import { Module } from '@nestjs/common';
import { BusGateway } from './bus.gateway';
import { BusService } from './bus.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { BusController } from './bus.controller';

@Module({
  imports: [AuthModule],
  providers: [BusGateway, BusService, PrismaService, AuthService],
  controllers: [BusController],
})
export class BusModule {}
