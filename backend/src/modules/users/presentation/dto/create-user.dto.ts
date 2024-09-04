import { Type } from 'class-transformer';
import { IsAlpha, IsEmail, IsNotEmpty, IsOptional, IsPositive, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	dni: string;

	@IsAlpha()
	@IsString()
	@IsNotEmpty()
	firstname: string;

	@IsAlpha()
	@IsString()
	@IsNotEmpty()
	lastname: string;

	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 })
	@IsNotEmpty()
	password: string;

	@IsString()
	@IsOptional()
	phone: string;

	@IsNotEmpty()
	@IsPositive()
	@Type(() => Number)
	roleId: number;
}
