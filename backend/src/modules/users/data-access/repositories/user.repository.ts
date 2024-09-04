import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@core/services/prisma.service';
import { PaginatedResult, PaginationParams } from '@core/interfaces/pagination.generic.interface';
import { IUserRepository } from '@users/data-access/repositories/user-repository.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async findAllPaginated(params: PaginationParams<User, Prisma.UserWhereInput>): Promise<PaginatedResult<User>> {
		const { page = 1, pageSize = 8, where } = params;
		const totalSkips: number = (page - 1) * pageSize;
		const [totalItems, data] = await Promise.all([
			this.prismaService.user.count({ where: { ...where, active: true } }),
			this.prismaService.user.findMany({
				where: { ...where, active: true },
				skip: totalSkips,
				take: pageSize,
				include: {
					role: true
				}
			})
		]);

		const totalPages = Math.ceil(totalItems / pageSize);

		return {
			data,
			totalItems,
			totalPages,
			currentPage: page,
			pageSize: pageSize
		};
	}

	async findById(id: number): Promise<User | null> {
		const userFound = await this.prismaService.user.findFirst({
			where: {
				userId: id
			},
			include: {
				role: true
			}
		});
		if (!userFound) {
			return null;
		}

		return userFound;
	}

	async findByEmail(email: string): Promise<User | null> {
		const userFound = await this.prismaService.user.findFirst({
			where: { email },
			include: {
				role: true
			}
		});
		if (!userFound) {
			return null;
		}

		return userFound;
	}

	findAll(): Promise<User[]> {
		throw new Error('Method not implemented.');
	}
	async save(entity: User): Promise<User> {
		const userCreated = await this.prismaService.user.create({
			data: {
				dni: entity.dni,
				firstname: entity.firstname,
				lastname: entity.lastname,
				phone: entity.phone,
				email: entity.email,
				password: entity.password,
				roleId: entity.roleId
			},
			include: {
				role: true
			}
		});
		return {
			...userCreated
		};
	}
	async update(entity: User): Promise<void> {
		const { userId, role, ...propsUser } = entity;

		await this.prismaService.user.update({
			where: {
				userId: entity.userId
			},
			data: {
				...propsUser
			}
		});
		return;
	}
	async delete(id: number): Promise<void> {
		await this.prismaService.user.update({
			where: {
				userId: id
			},
			data: {
				active: false
			}
		});
		return;
	}
}
