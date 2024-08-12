import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/users.controller';
import { UserService } from './business/services/user.service';
import { UserRepository } from './data-access/repositories/user.repository';
import { RoleController } from './presentation/controllers/role.controller';
import { RoleService } from './business/services/role.service';
import { RoleRepository } from './data-access/repositories/role.repository';
import { CoreModule } from '@core/core.module';

@Module({
	imports: [CoreModule],
	controllers: [RoleController, UserController],
	providers: [RoleService, RoleRepository, UserService, UserRepository]
})
export class UsersModule {}
