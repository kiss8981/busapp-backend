import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ResponseInterceptor } from './resource/interceptors/response.interceptor';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.enableCors(corsOptions);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const message = errors
          .map((error: ValidationError) => Object.values(error.constraints))
          .join(', ');
        return new BadRequestException(message);
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
