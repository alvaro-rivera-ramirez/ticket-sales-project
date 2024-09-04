import { Injectable } from '@nestjs/common';
import { IStageService } from '../interfaces/stage-service.interface';
import { StageModel } from '../models/stage.model';
import { StageRepository } from '../../data-access/repositories/stage.repository';

@Injectable()
export class StageService implements IStageService {
	constructor(private readonly stageRepository: StageRepository) {}
	async findById(id: number): Promise<StageModel | null> {
		const stageFound = await this.stageRepository.findById(id);
		return stageFound;
	}
	async create(stageData: StageModel): Promise<StageModel> {
		const stageCreated = await this.stageRepository.save(stageData);
		return stageCreated;
	}
	async update(stageData: StageModel): Promise<void> {
		await this.stageRepository.update(stageData);
		return;
	}
	async delete(id: number): Promise<void> {
		await this.stageRepository.delete(id);
		return;
	}
}
