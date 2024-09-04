import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';
import { VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../../business/services/auth.service';
import { UserModel } from '@users/business/models/user.model';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	constructor(
		private configService: ConfigService,
		private authService: AuthService
	) {
		super({
			clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
			clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
			callbackURL: configService.get<string>('GOOGLE_REDIRECT_URL'),
			scope: ['profile', 'email']
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: any, done: VerifiedCallback) {
		const user = await this.authService.validateGoogleUser(
			new UserModel({
				email: profile.emails[0].value,
				firstname: profile.name.givenName,
				lastname: profile.name.familyName,
				password: ''
			})
		);

		done(null, user);
	}
}
