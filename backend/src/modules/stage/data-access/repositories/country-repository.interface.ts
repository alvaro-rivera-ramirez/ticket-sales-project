import { IRepository } from '@core/interfaces/repository.interface';
import { Country } from '../entities/country.entity';

export interface ICountryRepository extends IRepository<Country> {
	createMany(entities: Country[]): Promise<Country[]>;
}
