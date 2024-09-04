import { Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule],
	controllers: [],
	providers: [PrismaService],
	exports: [PrismaService]
})
export class CoreModule {}
