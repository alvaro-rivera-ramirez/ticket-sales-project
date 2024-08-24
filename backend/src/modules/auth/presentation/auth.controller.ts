import { Request, Body, Controller, Post, UseGuards, Get } from '@nestjs/common';
import { UserSignUpDto } from './dto/sign-up.dto';
import { AuthService } from '../business/services/auth.service';
import { ErrorBase } from '@core/errors/error.base';
import { IToken } from '../business/interfaces/token.interface';
import { LocalAuthGuard } from '@core/guards/local-auth.guard';
import { JwtRefreshGuard } from '@core/guards/jwt-refresh.guard';
import { Public } from '@core/decorators/public-routes.decorator';
import { Role } from '@core/enums/role.enum';
import { Roles } from '@core/decorators/role.decorator';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@UseGuards(LocalAuthGuard)
	@Post('sign-in')
	async signIn(@Request() req): Promise<IToken> {
		try {
			const token = await this.authService.signIn(req.user);
			return token;
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}

	@Public()
	@Post('sign-up')
	signUp(@Body() signUpData: UserSignUpDto) {
		console.log(signUpData);
	}

	@Roles(Role.ADMIN, Role.CUSTOMER)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}

	@Public()
	@UseGuards(JwtRefreshGuard)
	@Post('refresh-token')
	async refreshToken(@Request() req): Promise<Omit<IToken, 'refresh_token'>> {
		const token = await this.authService.refreshToken(req.user);
		return token;
	}
}
