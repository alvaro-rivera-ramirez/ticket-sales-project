import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Param,
	ParseArrayPipe,
	ParseIntPipe,
	Post,
	Put
} from '@nestjs/common';
import { CountryService } from '../../business/services/country.service';
import { CreateCountryDto } from '../dto/create-country.dto';
import { CountryModel } from '../../business/models/country.model';
import { ErrorBase } from '@core/errors/error.base';

@Controller('country')
export class CountryController {
	constructor(private readonly countryService: CountryService) {}

	@Post()
	async create(@Body() createCountryDto: CreateCountryDto): Promise<CountryModel> {
		try {
			const countryModel: CountryModel = new CountryModel(createCountryDto);
			countryModel.countryId = (await this.countryService.create(countryModel)).countryId;
			return countryModel;
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}

	@Post('records')
	async createMany(
		@Body(new ParseArrayPipe({ items: CreateCountryDto })) createCountriesDto: CreateCountryDto[]
	): Promise<CountryModel[]> {
		try {
			if (createCountriesDto.length < 1) {
				throw new BadRequestException('Debe ingresar la información de al menos una ciudad');
			}
			const countriesModel: CountryModel[] = createCountriesDto.map((c) => new CountryModel(c));

			return await this.countryService.createMany(countriesModel);
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}

	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(@Param('id', new ParseIntPipe()) id: number, @Body() dataCountryDto: CreateCountryDto): Promise<void> {
		try {
			const countryModel: CountryModel = new CountryModel({ ...dataCountryDto, countryId: id });
			await this.countryService.update(countryModel);
			return;
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	async findById(@Param('id', new ParseIntPipe()) id: number): Promise<CountryModel> {
		try {
			const countryDataModel = await this.countryService.findById(id);
			if (!countryDataModel) throw new NotFoundException('Ciudad no encontrada');
			return countryDataModel;
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}
}
