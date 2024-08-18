import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@users/users.module';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './business/services/auth.service';

const configService = new ConfigService();

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: configService.get('JWT_SECRET'),
			signOptions: { expiresIn: '2h' }
		})
	],
	providers: [AuthService],
	controllers: [AuthController]
})
export class AuthModule {}
