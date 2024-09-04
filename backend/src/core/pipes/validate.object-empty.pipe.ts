import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ValidationObjectEmptyPipe implements PipeTransform {
	transform(value: any) {
		if (Object.keys(value).length === 0 && typeof value === 'object') {
			throw new BadRequestException('El cuerpo de la solicitud no puede estar vacío.');
		}
		return value;
	}
}
