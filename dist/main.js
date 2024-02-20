"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const response_interceptor_1 = require("./resource/interceptors/response.interceptor");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const corsOptions = {
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    };
    app.enableCors(corsOptions);
    app.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(app));
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({
        exceptionFactory: (errors) => {
            const message = errors
                .map((error) => Object.values(error.constraints))
                .join(', ');
            return new common_1.BadRequestException(message);
        },
    }));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map