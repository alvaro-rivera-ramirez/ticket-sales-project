import { IRepository } from '@core/interfaces/repository.interface';
import { User } from '../entities/user.entity';
import { Prisma } from '@prisma/client';

export interface IUserRepository extends IRepository<User, Prisma.UserWhereInput> {
	findByEmail(email: string): Promise<User | null>;
}
