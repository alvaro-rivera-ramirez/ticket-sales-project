import { Module } from '@nestjs/common';
import { CountryController } from './presentation/controllers/country.controller';
import { CountryService } from './business/services/country.service';
import { CountryRepository } from './data-access/repositories/country.repository';
import { CoreModule } from '@core/core.module';
import { StageController } from './presentation/controllers/stage.controller';
import { StageRepository } from './data-access/repositories/stage.repository';
import { StageService } from './business/services/stage.service';

@Module({
	imports: [CoreModule],
	controllers: [CountryController, StageController],
	providers: [CountryService, CountryRepository, StageRepository, StageService],
	exports: []
})
export class StageModule {}
