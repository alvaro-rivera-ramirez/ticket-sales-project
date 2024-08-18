import { IUserRepository } from '@users/data-access/repositories/user-repository.interface';
import { User } from '../entities/user.entity';
import { PrismaService } from '@core/services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements IUserRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async findById(id: number): Promise<User | null> {
		const userFound = await this.prismaService.user.findFirst({
			where: {
				userId: id
			}
		});
		if (!userFound) {
			return null;
		}

		return userFound;
	}

	async findByEmail(email: string): Promise<User | null> {
		const userFound = await this.prismaService.user.findFirst({ where: { email } });
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
			}
		});
		return {
			...userCreated
		};
	}
	async update(entity: User): Promise<void> {
		await this.prismaService.user.update({
			where: {
				userId: entity.userId
			},
			data: {
				dni: entity.dni,
				firstname: entity.firstname,
				lastname: entity.lastname,
				email: entity.email,
				phone: entity.phone,
				roleId: entity.roleId
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
