import { HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user-service.interface';
import { UserRepository } from '@users/data-access/repositories/user.repository';
import { UpdateUserDto } from '@users/presentation/dto/update-user.dto';
import { UserModel } from '../models/user.model';
import { Prisma } from '@prisma/client';
import { ErrorBase } from '@core/errors/error.base';

@Injectable()
export class UserService implements IUserService {
	constructor(private readonly userRepository: UserRepository) {}
	async create(userData: UserModel): Promise<UserModel> {
		try {
			await userData.createPassword(userData.password);
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
		console.log(email);
		const userFound = await this.userRepository.findByEmail(email);
		console.log(email);
		if (!userFound) return null;
		return new UserModel(userFound);
	}

	async update(updateUserDto: UpdateUserDto): Promise<void> {
		const userData = new UserModel(updateUserDto);
		await this.userRepository.update(userData);
		return;
	}

	async delete(id: number): Promise<void> {
		return await this.userRepository.delete(id);
	}
}
