import {
	Body,
	Controller,
	Get,
	HttpException,
	InternalServerErrorException,
	NotFoundException,
	Param,
	ParseIntPipe,
	Post
} from '@nestjs/common';
import { UserService } from '../../business/services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserModel } from '@users/business/models/user.model';
import { ErrorBase } from '@core/errors/error.base';
import { UserResponseDto } from '../dto/user-response.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
		try {
			const userDataModel = new UserModel(createUserDto);
			const userResponse = (await this.userService.create(userDataModel)) as UserResponseDto;
			return userResponse;
		} catch (error) {
			if (error instanceof ErrorBase) {
				console.log(error);
				throw new HttpException(error.message, error.status);
			}
			throw new InternalServerErrorException('Error en el servidor');
		}
	}

	@Get(':id')
	async findOneById(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
		try {
			const userDataModel = await this.userService.findById(id);
			console.log(userDataModel);
			if (!userDataModel) throw new NotFoundException('Usuario no encontrado');
			const userResponse = new UserResponseDto(userDataModel);
			console.log(userResponse);
			return userResponse;
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}
}
