import { BaseEntity } from '@core/config/base.entity';
import { Role } from './role.entity';

export interface User extends BaseEntity {
	userId: number;
	dni: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	phone?: string;
	roleId: number;
	role: Role;
}
