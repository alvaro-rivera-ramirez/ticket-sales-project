import { OmitType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'] as const)) {}

export class UpdatePasswordUserDto extends PickType(CreateUserDto, ['password'] as const) {}

export class UpdateEmailUserDto extends PickType(CreateUserDto, ['email'] as const) {}
