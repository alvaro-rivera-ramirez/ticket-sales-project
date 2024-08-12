import { UserModel } from '../models/user.model';

export interface IUserService {
	create(createUserModelDto: UserModel): Promise<UserModel>;
	findAll(): Promise<UserModel[] | null>;
	findById(id: number): Promise<UserModel | null>;
	update(data: Partial<UserModel>): Promise<void>;
	delete(id: number): Promise<void>;
}
