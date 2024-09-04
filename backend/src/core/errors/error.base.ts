import { HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';

export class ErrorBase extends Error {
	status?: HttpStatus;
	constructor(message?: string, status?: HttpStatus) {
		super(message);
		this.status = status;
	}

	static handleException(error: Error | HttpException) {
		console.log(error);
		if (error instanceof ErrorBase) {
			throw new HttpException(error.message, error.status);
		}
		if (error instanceof HttpException) {
			throw error;
		}
		throw new InternalServerErrorException('Error en el servidor');
	}
}
