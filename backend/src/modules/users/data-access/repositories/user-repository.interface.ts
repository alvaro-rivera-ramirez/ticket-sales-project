import { IRepository } from '@core/interfaces/repository.interface';
import { User } from '../entities/user.entity';

export interface IUserRepository extends IRepository<User> {
	findByEmail(email: string): Promise<User | null>;
}
