import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/services/prisma.service';
import { Country } from '../entities/country.entity';
import { ICountryRepository } from './country-repository.interface';

@Injectable()
export class CountryRepository implements ICountryRepository {
	constructor(private readonly prismaService: PrismaService) {}
	async findById(id: number): Promise<Country | null> {
		const countryFound = await this.prismaService.country.findFirst({
			where: {
				countryId: id
			}
		});
		if (!countryFound) {
			return null;
		}
		return countryFound;
	}
	findAll(): Promise<Country[]> {
		throw new Error('Method not implemented.');
	}
	async save(entity: Country): Promise<Country> {
		const countryCreated = await this.prismaService.country.create({
			data: {
				...entity
			}
		});
		return countryCreated;
	}
	async update(entity: Country): Promise<void> {
		await this.prismaService.country.update({
			where: {
				countryId: entity.countryId
			},
			data: {
				name: entity.name
			}
		});
	}
	async delete(id: number): Promise<void> {
		await this.prismaService.country.update({
			where: {
				countryId: id
			},
			data: {
				active: false
			}
		});
		return;
	}

	async createMany(entities: Country[]): Promise<Country[]> {
		const countriesCreated = await this.prismaService.country.createManyAndReturn({
			data: entities
		});

		return countriesCreated;
	}
}
