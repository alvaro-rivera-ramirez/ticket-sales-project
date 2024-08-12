import { IRepository } from '@core/interfaces/repository.interface';
import { Role } from '../entities/role.entity';

export interface IRoleRepository extends IRepository<Role> {}
