import { Role } from '@users/data-access/entities/role.entity';
import { Exclude } from 'class-transformer';

export class RoleModel implements Role {
	roleId: number;
	name: string;
	active: boolean;
	@Exclude()
	createdAt: Date;
	@Exclude()
	updatedAt: Date;

	constructor(props: Partial<Role>) {
		Object.assign(this, props);
	}
}
