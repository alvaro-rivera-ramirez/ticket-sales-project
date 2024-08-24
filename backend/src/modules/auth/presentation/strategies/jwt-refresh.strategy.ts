import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../business/types/jwt-payload.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor(private configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
			secretOrKey: configService.get<string>('JWT_REFRESH_SECRET') ?? '',
			ignoreExpiration: false
		});
	}

	validate(payload: any): JwtPayload {
		const newPayload: JwtPayload = {
			sub: payload.sub,
			fullname: payload.fullname,
			role: payload.role
		};
		return newPayload;
	}
}
