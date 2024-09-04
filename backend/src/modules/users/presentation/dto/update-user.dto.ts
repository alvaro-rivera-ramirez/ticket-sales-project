import { IntersectionType, OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ActivateUserDto {
	@Type(() => Boolean)
	@IsOptional()
	active: boolean;
}

export class UpdateUserDto extends PartialType(IntersectionType(CreateUserDto, ActivateUserDto)) {}

export class UpdatePasswordUserDto extends PickType(CreateUserDto, ['password'] as const) {}

export class UpdateEmailUserDto extends PickType(CreateUserDto, ['email'] as const) {}
