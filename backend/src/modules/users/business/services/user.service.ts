import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { IUserService } from '../interfaces/user-service.interface';
import { UserRepository } from '@users/data-access/repositories/user.repository';
import { UpdateUserDto } from '@users/presentation/dto/update-user.dto';
import { UserModel } from '../models/user.model';
import { Prisma } from '@prisma/client';
import { ErrorBase } from '@core/errors/error.base';
import { PaginationParamsEssentials, PaginatedResult } from '@core/interfaces/pagination.generic.interface';
import { RoleModel } from '../models/role.model';

@Injectable()
export class UserService implements IUserService {
	constructor(private readonly userRepository: UserRepository) {}

	generatedParamsSearch(search: string): Prisma.UserWhereInput {
		return {
			OR: [
				{
					firstname: {
						mode: 'insensitive',
						contains: search
					}
				},
				{
					lastname: {
						mode: 'insensitive',
						contains: search
					}
				}
			]
		};
	}
	async findAllPaginated(paginationParams: PaginationParamsEssentials): Promise<PaginatedResult<UserModel>> {
		const { page = 1, pageSize = 8, search = '' } = paginationParams;

		const newSearch = search.length > 0 ? this.generatedParamsSearch(search) : {};
		const results = await this.userRepository.findAllPaginated({ page, pageSize, where: newSearch });
		const dataFormated = results.data.map((u) => new UserModel({ ...u, role: new RoleModel(u.role) }));

		return {
			...results,
			data: dataFormated
		};
	}
	async create(userData: UserModel, withPassword: boolean = true): Promise<UserModel> {
		try {
			if (withPassword) {
				await userData.createPassword(userData.password);
			}
			userData.userId = (await this.userRepository.save(userData)).userId;
			return userData;
		} catch (e) {
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				if (e.code === 'P2002') {
					throw new ErrorBase('Ya existe un usuario con el mismo correo y/o dni', HttpStatus.UNPROCESSABLE_ENTITY);
				}
				throw new ErrorBase('Error al guardar el usuario', HttpStatus.UNPROCESSABLE_ENTITY);
			}
			throw new Error();
		}
	}

	findAll(): Promise<UserModel[] | null> {
		throw new Error('Method not implemented.');
	}

	async findById(id: number): Promise<UserModel | null> {
		const userFound = await this.userRepository.findById(id);
		if (!userFound) return null;
		return new UserModel(userFound);
	}

	async findByEmail(email: string): Promise<UserModel | null> {
		const userFound = await this.userRepository.findByEmail(email);
		if (!userFound) return null;
		return new UserModel(userFound);
	}

	async update(userData: UserModel): Promise<void> {
		await this.validateExistUser(userData.userId);
		console.log(userData);
		await this.userRepository.update(userData);
		return;
	}

	async delete(id: number): Promise<void> {
		await this.validateExistUser(id);
		return await this.userRepository.delete(id);
	}

	async validateExistUser(id: number): Promise<void> {
		const userExists = await this.findById(id);
		if (!userExists) throw new NotFoundException('Usuario no encontrado');
	}
}
