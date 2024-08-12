import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { RoleService } from '@users/business/services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { RoleModel } from '@users/business/models/role.model';
import { ErrorBase } from '@core/errors/error.base';

@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Post()
	create(@Body() createRoleDto: CreateRoleDto) {
		try {
			const roleModel = new RoleModel(createRoleDto);
			return this.roleService.create(roleModel);
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}

	@Get()
	findAll() {
		// return this.sService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		// return this.sService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateRoleDto: CreateRoleDto) {
		// return this.sService.update(+id, updateDto);
	}
}
