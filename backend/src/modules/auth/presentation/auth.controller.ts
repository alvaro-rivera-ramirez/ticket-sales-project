import { Body, Controller, Post } from '@nestjs/common';
import { UserSignInDto } from './dto/sign-in.dto';
import { UserSignUpDto } from './dto/sign-up.dto';
import { AuthService } from '../business/services/auth.service';
import { ErrorBase } from '@core/errors/error.base';
import { IToken } from '../business/interfaces/token.interface';
import { Public } from '@core/guards/auth.guard';

@Public()
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('sign-in')
	async signIn(@Body() signInData: UserSignInDto): Promise<IToken> {
		try {
			const token = await this.authService.signIn(signInData);
			console.log(token);
			return token;
		} catch (error) {
			console.log(error);
			ErrorBase.handleException(error);
		}
	}

	@Post('sign-up')
	signUp(@Body() signUpData: UserSignUpDto) {
		console.log(signUpData);
	}
}
