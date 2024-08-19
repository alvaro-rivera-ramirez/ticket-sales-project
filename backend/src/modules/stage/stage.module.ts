import { Module } from '@nestjs/common';
import { CountryController } from './presentation/controllers/country.controller';
import { CountryService } from './business/services/country.service';
import { CountryRepository } from './data-access/repositories/country.repository';
import { CoreModule } from '@core/core.module';

@Module({
	imports: [CoreModule],
	controllers: [CountryController],
	providers: [CountryService, CountryRepository],
	exports: []
})
export class StageModule {}
