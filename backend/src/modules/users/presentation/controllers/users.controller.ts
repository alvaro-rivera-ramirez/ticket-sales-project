import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	HttpException,
	InternalServerErrorException,
	NotFoundException,
	Param,
	Post,
	UseInterceptors
} from '@nestjs/common';
import { UserService } from '../../business/services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserModel } from '@users/business/models/user.model';
import { ErrorBase } from '@core/errors/error.base';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@UseInterceptors(ClassSerializerInterceptor)
	async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
		try {
			const userDataModel = new UserModel(createUserDto);
			userDataModel.userId = (await this.userService.create(userDataModel)).userId;
			return userDataModel;
		} catch (error) {
			if (error instanceof ErrorBase) {
				throw new HttpException(error.message, error.status);
			}
			throw new InternalServerErrorException('Error en el servidor');
		}
	}

	@Get(':id')
	@UseInterceptors(ClassSerializerInterceptor)
	async findOneById(@Param('id') id: number): Promise<UserModel> {
		try {
			const userDataModel = await this.userService.findById(id);
			if (!userDataModel) throw new NotFoundException('Usuario no encontrado');
			return userDataModel;
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}
}
