import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { StageService } from '../../business/services/stage.service';
import { CreateStageDto } from '../dto/create-stage.dto';
import { StageModel } from '../../business/models/stage.model';
import { ErrorBase } from '@core/errors/error.base';
import { UpdateStageDto } from '../dto/update-stage.dto';

@Controller('stage')
export class StageController {
	constructor(private readonly stageService: StageService) {}

	@Post()
	async create(@Body() createStageDto: CreateStageDto): Promise<StageModel> {
		try {
			const stageCreated = await this.stageService.create(new StageModel(createStageDto));
			return stageCreated;
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}

	//   @Get()
	//   findAll() {
	//     return this.stageService.findAll();
	//   }

	@Get(':id')
	async findOne(@Param('id') id: number): Promise<StageModel> {
		const stageFound = await this.stageService.findById(id);
		if (!stageFound) {
			throw new NotFoundException('Escenario no encontrado');
		}
		return stageFound;
	}

	@Patch(':id')
	async update(@Param('id') id: number, @Body() updateStageDto: UpdateStageDto): Promise<void> {
		try {
			const stageDataModel = new StageModel({ ...updateStageDto, stageId: id });
			return this.stageService.update(stageDataModel);
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: number): Promise<void> {
		try {
			await this.stageService.delete(id);
			return;
		} catch (error) {
			ErrorBase.handleException(error);
		}
	}
}
