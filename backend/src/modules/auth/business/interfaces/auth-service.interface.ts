import { AuthModel } from '../models/auth.model';
import { IToken } from './token.interface';

export interface IAuthService {
	signIn(authDataModel: AuthModel): Promise<IToken>;
}
