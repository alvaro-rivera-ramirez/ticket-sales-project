import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateStageDto {
	@IsInt()
	@IsPositive()
	@Type(() => Number)
	@IsNotEmpty()
	countryId: number;
	@IsString()
	@IsNotEmpty()
	name: string;
	@IsInt()
	@IsPositive()
	@Type(() => Number)
	@IsNotEmpty()
	capacity: number;
	@IsString()
	@IsNotEmpty()
	address: string;
	@IsString()
	@IsOptional()
	addressReferences?: string;
}
