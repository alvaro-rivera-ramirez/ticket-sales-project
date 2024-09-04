import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/services/prisma.service';
import { Role } from '../entities/role.entity';
import { IRoleRepository } from './role-repository.interface';
import { PaginationParams, PaginatedResult } from '@core/interfaces/pagination.generic.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleRepository implements IRoleRepository {
	constructor(private readonly prismaService: PrismaService) {}
	findAllPaginated(params: PaginationParams<Role, Prisma.RoleWhereInput>): Promise<PaginatedResult<Role>> {
		throw new Error('Method not implemented.');
	}

	findById(id: number): Promise<Role> {
		throw new Error('Method not implemented.');
	}
	findAll(): Promise<Role[]> {
		throw new Error('Method not implemented.');
	}
	async save(entity: Role): Promise<Role> {
		console.log(entity.name);
		const roleCreated = await this.prismaService.role.create({
			data: {
				name: entity.name
			}
		});
		return { ...roleCreated };
	}
	update(entity: Role): Promise<void> {
		throw new Error('Method not implemented.');
	}
	delete(id: number): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
