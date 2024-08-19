import { Country } from '../../data-access/entities/country.entity';
export class CountryModel implements Country {
	countryId: number;
	name: string;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
	constructor(props: Partial<Country>) {
		Object.assign(this, props);
	}
}
