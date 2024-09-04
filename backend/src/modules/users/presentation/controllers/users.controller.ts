import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpException,
	HttpStatus,
	InternalServerErrorException,
	NotFoundException,
	Param,
	Post,
	Put,
	Query,
	UseInterceptors
} from '@nestjs/common';
import { UserService } from '../../business/services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserModel } from '@users/business/models/user.model';
import { ErrorBase } from '@core/errors/error.base';
import { PaginatedResult, PaginationParamsEssentials } from '@core/interfaces/pagination.generic.interface';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ValidationObjectEmptyPipe } from '@core/pipes/validate.object-empty.pipe';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(ClassSerializerInterceptor)
	async findAll(@Query() params: PaginationParamsEssentials): Promise<PaginatedResult<UserModel>> {
		try {
			console.log(params);
			const results = await this.userService.findAllPaginated(params);
			return results;
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}

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

	@Put(':id')
	@HttpCode(HttpStatus.OK)
	async updateUser(@Body(new ValidationObjectEmptyPipe()) updateUserDto: UpdateUserDto, @Param('id') id: number) {
		try {
			await this.userService.update(new UserModel({ ...updateUserDto, userId: id }));
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}

	@Delete(':id')
	@HttpCode(HttpStatus.OK)
	async deleteUser(@Param('id') id: number) {
		try {
			await this.userService.delete(id);
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}
}
