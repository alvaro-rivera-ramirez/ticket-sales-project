import { User } from '@users/data-access/entities/user.entity';
import { encrypt } from '@utils/hash.utils';

export class UserModel implements User {
	userId: number;
	dni: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	phone: string;
	roleId: number;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;

	constructor(props: Partial<User>) {
		Object.assign(this, props);
	}

	async createPassword(password: string) {
		this.password = await encrypt(password);
	}
}
