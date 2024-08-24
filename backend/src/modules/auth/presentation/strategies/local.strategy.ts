import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../../business/types/jwt-payload.type';
import { AuthService } from '../../business/services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			usernameField: 'email'
		});
	}

	async validate(email: string, password: string): Promise<JwtPayload> {
		const userPayload = await this.authService.validateUser({ email, password });
		return userPayload;
	}
}
