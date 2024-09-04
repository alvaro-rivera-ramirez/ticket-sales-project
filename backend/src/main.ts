import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const port = configService.get<number>('APP_PORT');

	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	await app.listen(port);
}
bootstrap();
