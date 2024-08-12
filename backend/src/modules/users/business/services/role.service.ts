import { Injectable } from '@nestjs/common';
import { IRoleService } from '../interfaces/role-service.interface';
import { RoleModel } from '../models/role.model';
import { RoleRepository } from '@users/data-access/repositories/role.repository';

@Injectable()
export class RoleService implements IRoleService {
	constructor(private readonly roleRepository: RoleRepository) {}

	async create(roleData: RoleModel): Promise<RoleModel> {
		roleData.roleId = (await this.roleRepository.save(roleData)).roleId;
		return roleData;
	}
}
