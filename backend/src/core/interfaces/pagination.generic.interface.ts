import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class PaginationParamsEssentials {
	@Type(() => Number)
	@IsOptional()
	page: number;
	@Type(() => Number)
	@IsOptional()
	pageSize: number;
	@IsNotEmpty()
	@IsOptional()
	search?: string;
}

export class PaginationParams<T, W> extends PaginationParamsEssentials {
	sortBy?: keyof T;
	sortOrder?: 'asc' | 'desc';
	where?: W;
}

export class PaginatedResult<T> {
	data: T[];
	totalItems: number;
	totalPages: number;
	currentPage: number;
	pageSize: number;
}

// export class HandlePagination {
// 	constructor(private prismaService: PrismaService) {}

// 	async paginate<T, W>(params: PaginationParams<T, W>): Promise<PaginatedResult<T>> {
// 		const { page, pageSize, sortBy, sortOrder, where } = params;
// 		const currentPage = Math.max(page, 1);
// 		const validPageSize = Math.max(pageSize, 1);
// 		const skip = (currentPage - 1) * validPageSize;

// 		const orderBy = sortBy ? { [sortBy]: sortOrder || 'asc' } : {};

// 		// Realiza la consulta con paginación y condiciones WHERE
// 		const [totalItems, data] = await Promise.all([
// 			this.prismaService. count({ where }),
// 			model.findMany({
// 				where, // Aplica el filtro WHERE
// 				skip,
// 				take: validPageSize,
// 				orderBy
// 			})
// 		]);

// 		const totalPages = Math.ceil(totalItems / validPageSize);

// 		return {
// 			data,
// 			totalItems,
// 			totalPages,
// 			currentPage,
// 			pageSize: validPageSize
// 		};
// 	}
// }
