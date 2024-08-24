import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { UsersModule } from '@users/users.module';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './business/services/auth.service';
import { LocalStrategy, JwtStrategy, JwtRefreshStrategy } from './presentation/strategies';
import { RolesGuard } from '@core/guards/role.guard';

const configService = new ConfigService();

@Module({
	imports: [
		ConfigModule,
		PassportModule,
		JwtModule.register({
			global: true,
			secret: configService.get('JWT_SECRET'),
			signOptions: { expiresIn: configService.get('JWT_EXPIRED') }
		}),
		UsersModule
	],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		JwtRefreshStrategy,
		{ provide: APP_GUARD, useClass: JwtAuthGuard },
		{ provide: APP_GUARD, useClass: RolesGuard }
	],
	controllers: [AuthController]
})
export class AuthModule {}
