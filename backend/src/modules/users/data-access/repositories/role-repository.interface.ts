import { IRepository } from '@core/interfaces/repository.interface';
import { Role } from '../entities/role.entity';
import { Prisma } from '@prisma/client';

export interface IRoleRepository extends IRepository<Role, Prisma.RoleWhereInput> {}
