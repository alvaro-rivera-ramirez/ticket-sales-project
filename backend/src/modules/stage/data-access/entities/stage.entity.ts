import { BaseEntity } from '@core/config/base.entity';
import { Country } from './country.entity';

export interface Stage extends BaseEntity {
	stageId: number;
	countryId: number;
	name: string;
	capacity: number;
	address: string;
	addressReferences?: string;
	country: Country;
}
