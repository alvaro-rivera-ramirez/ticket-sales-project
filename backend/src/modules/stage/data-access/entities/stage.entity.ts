import { BaseEntity } from '@core/config/base.entity';

export interface Stage extends BaseEntity {
	stageId: number;
	countryId: number;
	name: string;
	capacity: number;
	address: string;
	stagePartsImg: string;
	addressReferences?: string;
}
