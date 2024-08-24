import { Country } from '../../data-access/entities/country.entity';
import { Stage } from '../../data-access/entities/stage.entity';

export class StageModel implements Stage {
	stageId: number;
	countryId: number;
	name: string;
	capacity: number;
	address: string;
	addressReferences?: string;
	country: Country;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
	constructor(props: Partial<StageModel>) {
		Object.assign(this, props);
	}
}
