import { BaseEntity } from '@core/config/base.entity';

export interface Country extends BaseEntity {
	countryId: number;
	name: string;
}
