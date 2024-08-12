import { Role } from '@users/data-access/entities/role.entity';

export class RoleModel implements Role {
	roleId: number;
	name: string;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;

	constructor(props: Partial<Role>) {
		Object.assign(this, props);
	}
}
