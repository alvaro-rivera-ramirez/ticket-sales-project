import { Role } from '@users/data-access/entities/role.entity';
import { User } from '@users/data-access/entities/user.entity';
import { encrypt, compare } from '@utils/hash.utils';
import { Exclude } from 'class-transformer';
import { RoleModel } from './role.model';

export class UserModel implements User {
	userId: number;
	dni: string;
	firstname: string;
	lastname: string;
	email: string;
	@Exclude()
	password: string;
	phone: string;
	roleId: number;
	active: boolean;
	@Exclude()
	createdAt: Date;
	@Exclude()
	updatedAt: Date;
	role: RoleModel;
	constructor(props: Partial<User>) {
		Object.assign(this, props);
	}

	async createPassword(password: string) {
		this.password = await encrypt(password);
	}

	async checkPassword(_password: string): Promise<boolean> {
		return await compare(_password, this.password);
	}

	get fullname() {
		return this.firstname + ' ' + this.lastname;
	}
}
