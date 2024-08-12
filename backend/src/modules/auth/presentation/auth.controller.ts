import { Body, Controller, Post } from '@nestjs/common';
import { UserSignInDto } from './dto/sign-in.dto';
import { UserSignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
	constructor() {}

	@Post('sign-in')
	signIn(@Body() signInData: UserSignInDto) {
		console.log(signInData);
	}

	@Post('sign-up')
	signUp(@Body() signUpData: UserSignUpDto) {
		console.log(signUpData);
	}
}
