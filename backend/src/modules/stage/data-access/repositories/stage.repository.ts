import { Injectable } from '@nestjs/common';
import { Stage } from '../entities/stage.entity';
import { PrismaService } from '@core/services/prisma.service';
import { IStageRepository } from './stage-repository.interface';
import { PaginationParams, PaginatedResult } from '@core/interfaces/pagination.generic.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class StageRepository implements IStageRepository {
	constructor(private readonly prismaService: PrismaService) {}
	findAllPaginated(params: PaginationParams<Stage, Prisma.StageWhereInput>): Promise<PaginatedResult<Stage>> {
		throw new Error('Method not implemented.');
	}

	async findById(id: number): Promise<Stage> {
		const stageFound = await this.prismaService.stage.findFirst({
			where: {
				stageId: id
			},
			include: {
				country: true
			}
		});
		return stageFound;
	}
	findAll(): Promise<Stage[]> {
		throw new Error('Method not implemented.');
	}
	async save(entity: Stage): Promise<Stage> {
		const stageCreated = await this.prismaService.stage.create({
			data: {
				name: entity.name,
				address: entity.address,
				capacity: entity.capacity,
				addressReferences: entity.addressReferences,
				countryId: entity.countryId
			}
		});
		return { ...stageCreated, country: undefined };
	}
	async update(entity: Stage): Promise<void> {
		const { country, ...propsStage } = entity;

		await this.prismaService.stage.update({
			where: {
				stageId: entity.stageId,
				active: true
			},
			data: {
				...propsStage
			}
		});
		return;
	}
	async delete(id: number): Promise<void> {
		await this.prismaService.stage.update({
			where: {
				stageId: id
			},
			data: {
				active: false
			}
		});
		return;
	}
}
