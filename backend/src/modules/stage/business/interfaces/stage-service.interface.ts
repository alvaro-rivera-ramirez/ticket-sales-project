import { StageModel } from '../models/stage.model';

export interface IStageService {
	findById(id: number): Promise<StageModel | null>;
	create(stageData: StageModel): Promise<StageModel>;
	update(stageData: StageModel): Promise<void>;
	delete(id: number): Promise<void>;
}
