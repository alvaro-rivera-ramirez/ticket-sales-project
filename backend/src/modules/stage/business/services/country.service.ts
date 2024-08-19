import { Injectable } from '@nestjs/common';
import { ICountryService } from '../interfaces/country-service.interface';
import { CountryModel } from '../models/country.model';
import { CountryRepository } from '../../data-access/repositories/country.repository';

@Injectable()
export class CountryService implements ICountryService {
	constructor(private readonly countryRepository: CountryRepository) {}
	async findById(id: number): Promise<CountryModel | null> {
		const countryFound = await this.countryRepository.findById(id);
		if (!countryFound) return null;
		return countryFound as CountryModel;
	}
	async create(countryData: CountryModel): Promise<CountryModel> {
		countryData.countryId = (await this.countryRepository.save(countryData)).countryId;
		return countryData;
	}
	async update(countryData: CountryModel): Promise<void> {
		await this.countryRepository.update(countryData);
		return;
	}
	async delete(id: number): Promise<void> {
		return await this.countryRepository.delete(id);
	}

	async createMany(countriesData: CountryModel[]): Promise<CountryModel[]> {
		const countriesCreated = await this.countryRepository.createMany(countriesData);
		return countriesCreated.map((c) => new CountryModel(c));
	}
}
