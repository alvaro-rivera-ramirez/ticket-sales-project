import { PaginatedResult, PaginationParams } from './pagination.generic.interface';

export interface IRepository<T, W> {
	findById(id: number): Promise<T | null>;
	findAll(): Promise<T[]>;
	findAllPaginated(params: PaginationParams<T, W>): Promise<PaginatedResult<T>>;
	save(entity: T): Promise<T>;
	update(entity: T): Promise<void>;
	delete(id: number): Promise<void>;
}
