import { RoleModel } from '@users/business/models/role.model';

export type JwtPayload = {
	sub: number;
	fullname: string;
	role: RoleModel;
};
