import { StageModel } from '../models/stage.model';

export interface IStageService {
	findById(id: number): Promise<StageModel | null>;
	create(countryData: StageModel): Promise<StageModel>;
	update(countryData: StageModel): Promise<void>;
	delete(id: number): Promise<void>;
}
