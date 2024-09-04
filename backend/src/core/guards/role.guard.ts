import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@core/decorators/role.decorator';
import { Role } from '@core/enums/role.enum';
import { UserModel } from '../../modules/users/business/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		]);
		if (!requiredRoles) {
			return true;
		}

		const user: UserModel = context.switchToHttp().getRequest().user;

		return requiredRoles.some((role) => user.role.roleId == role);
	}
}
