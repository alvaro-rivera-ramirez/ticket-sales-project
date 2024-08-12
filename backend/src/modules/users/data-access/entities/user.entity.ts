import { BaseEntity } from '@core/config/base.entity';

export interface User extends BaseEntity {
	userId: number;
	dni: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	phone?: string;
	roleId: number;
}
