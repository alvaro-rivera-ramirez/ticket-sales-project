import { Role } from '@users/data-access/entities/role.entity';
import { User } from '@users/data-access/entities/user.entity';
import { encrypt, compare } from '@utils/hash.utils';
import { Exclude } from 'class-transformer';

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
	createdAt: Date;
	updatedAt: Date;
	role: Role;
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
