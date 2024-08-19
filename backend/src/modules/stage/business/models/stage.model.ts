import { Stage } from '../../data-access/entities/stage.entity';

export class StageModel implements Stage {
	stageId: number;
	countryId: number;
	name: string;
	capacity: number;
	address: string;
	addressReferences?: string;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
}
