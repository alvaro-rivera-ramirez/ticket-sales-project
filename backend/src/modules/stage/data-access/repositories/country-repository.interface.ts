import { IRepository } from '@core/interfaces/repository.interface';
import { Country } from '../entities/country.entity';
import { Prisma } from '@prisma/client';

export interface ICountryRepository extends IRepository<Country, Prisma.CountryWhereInput> {
	createMany(entities: Country[]): Promise<Country[]>;
}
