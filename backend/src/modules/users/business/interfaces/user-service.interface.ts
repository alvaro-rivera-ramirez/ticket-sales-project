import { PaginatedResult, PaginationParamsEssentials } from '@core/interfaces/pagination.generic.interface';
import { UserModel } from '../models/user.model';

export interface IUserService {
	create(createUserModelDto: UserModel, withPassword: boolean): Promise<UserModel>;
	findAll(): Promise<UserModel[] | null>;
	findAllPaginated(paginationParams: PaginationParamsEssentials): Promise<PaginatedResult<UserModel>>;
	findById(id: number): Promise<UserModel | null>;
	update(data: Partial<UserModel>): Promise<void>;
	delete(id: number): Promise<void>;
	findByEmail(email: string): Promise<UserModel | null>;
}
