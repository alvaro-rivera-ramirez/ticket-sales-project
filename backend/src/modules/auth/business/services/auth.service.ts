import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@users/business/services/user.service';
import { IAuthService } from '../interfaces/auth-service.interface';
import { IToken } from '../interfaces/token.interface';
import { AuthModel } from '../models/auth.model';
import { JwtPayload } from '../types/jwt-payload.type';
import { RoleModel } from '@users/business/models/role.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements IAuthService {
	constructor(
		private configService: ConfigService,
		private jwtService: JwtService,
		private userService: UserService
	) {}

	async validateUser(authDataModel: AuthModel): Promise<JwtPayload> {
		const user = await this.userService.findByEmail(authDataModel.email);
		const isMatchedPassword = await user.checkPassword(authDataModel.password);
		if (!isMatchedPassword) {
			throw new UnauthorizedException('El email y/o password es incorrecto');
		}
		const payload: JwtPayload = {
			sub: user.userId,
			fullname: user.fullname,
			role: new RoleModel({ roleId: user.role.roleId, name: user.role.name })
		};
		return payload;
	}
	async signIn(payload: JwtPayload): Promise<IToken> {
		const tokens: IToken = await this.generateTokens(payload);
		return tokens;
	}

	async generateTokens(payload: JwtPayload): Promise<IToken> {
		const [accessToken, refreshToken] = await Promise.all([
			this.jwtService.signAsync(payload),
			this.jwtService.signAsync(payload, {
				secret: this.configService.get<string>('JWT_REFRESH_SECRET') ?? '',
				expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRED') ?? ''
			})
		]);
		return {
			access_token: accessToken,
			refresh_token: refreshToken
		};
	}

	async refreshToken(payloadData: JwtPayload): Promise<Omit<IToken, 'refresh_token'>> {
		const accessToken = await this.jwtService.signAsync(payloadData);
		return { access_token: accessToken };
	}
}
