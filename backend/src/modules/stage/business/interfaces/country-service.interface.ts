import { CountryModel } from '../models/country.model';

export interface ICountryService {
	findById(id: number): Promise<CountryModel | null>;
	create(countryData: CountryModel): Promise<CountryModel>;
	update(countryData: CountryModel): Promise<void>;
	delete(id: number): Promise<void>;
	createMany(countriesData: CountryModel[]): Promise<CountryModel[]>;
}
