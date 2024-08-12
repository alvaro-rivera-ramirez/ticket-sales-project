import { RoleModel } from '../models/role.model';

export interface IRoleService {
	create(roleData: RoleModel): Promise<RoleModel>;
}
