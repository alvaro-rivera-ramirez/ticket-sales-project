import { JwtPayload } from '../types/jwt-payload.type';
import { IToken } from './token.interface';

export interface IAuthService {
	signIn(authDataModel: JwtPayload): Promise<IToken>;
	refreshToken(payloadData: JwtPayload): Promise<Omit<IToken, 'refresh_token'>>;
}
