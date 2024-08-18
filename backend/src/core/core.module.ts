import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { AuthGuard } from './guards/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

@Module({
	imports: [ConfigModule],
	controllers: [],
	providers: [
		PrismaService,
		{
			provide: APP_GUARD,
			useClass: AuthGuard
		}
	],
	exports: [PrismaService]
})
export class CoreModule {}
