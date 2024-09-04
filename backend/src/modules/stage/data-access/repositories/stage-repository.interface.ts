import { IRepository } from '@core/interfaces/repository.interface';
import { Stage } from '../entities/stage.entity';
import { Prisma } from '@prisma/client';

export interface IStageRepository extends IRepository<Stage, Prisma.StageWhereInput> {}
