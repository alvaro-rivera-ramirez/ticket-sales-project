import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@users/business/services/user.service';
import { IAuthService } from '../interfaces/auth-service.interface';
import { IToken } from '../interfaces/token.interface';
import { AuthModel } from '../models/auth.model';

@Injectable()
export class AuthService implements IAuthService {
	constructor(
		private jwtService: JwtService,
		private userService: UserService
	) {}
	async signIn(authDataModel: AuthModel): Promise<IToken> {
		console.log(authDataModel);
		const user = await this.userService.findByEmail(authDataModel.email);
		console.log(user);
		const isMatchedPassword = await user.checkPassword(authDataModel.password);
		console.log(isMatchedPassword);
		if (!isMatchedPassword) {
			throw new UnauthorizedException('El email y/o password es incorrecto');
		}
		const payload = { sub: user.userId, firstname: user.firstname };
		console.log(payload);
		return {
			access_token: await this.jwtService.signAsync(payload)
		};
	}
}
