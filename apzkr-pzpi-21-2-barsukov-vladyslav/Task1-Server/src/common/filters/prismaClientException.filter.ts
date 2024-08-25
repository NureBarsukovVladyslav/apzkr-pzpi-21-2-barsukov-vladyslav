import { ArgumentsHost, Catch, HttpException, HttpServer, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

export type ErrorCodesStatusMapping = {
	[key: string]: number;
};

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
	private readonly errorCodesStatusMapping: ErrorCodesStatusMapping = {
		P2000: HttpStatus.BAD_REQUEST,
		P2001: HttpStatus.NOT_FOUND,
		P2002: HttpStatus.CONFLICT,
		P2003: HttpStatus.CONFLICT,
		P2004: HttpStatus.BAD_REQUEST,
		P2005: HttpStatus.BAD_REQUEST,
		P2006: HttpStatus.BAD_REQUEST,
		P2007: HttpStatus.BAD_REQUEST,
		P2008: HttpStatus.BAD_REQUEST,
		P2009: HttpStatus.BAD_REQUEST,
		P2010: HttpStatus.INTERNAL_SERVER_ERROR,
		P2011: HttpStatus.BAD_REQUEST,
		P2012: HttpStatus.BAD_REQUEST,
		P2013: HttpStatus.BAD_REQUEST,
		P2014: HttpStatus.BAD_REQUEST,
		P2015: HttpStatus.NOT_FOUND,
		P2016: HttpStatus.BAD_REQUEST,
		P2017: HttpStatus.BAD_REQUEST,
		P2018: HttpStatus.NOT_FOUND,
		P2019: HttpStatus.BAD_REQUEST,
		P2020: HttpStatus.BAD_REQUEST,
		P2021: HttpStatus.NOT_FOUND,
		P2022: HttpStatus.NOT_FOUND,
		P2023: HttpStatus.BAD_REQUEST,
		P2024: HttpStatus.INTERNAL_SERVER_ERROR,
		P2025: HttpStatus.NOT_FOUND,
		P2026: HttpStatus.BAD_REQUEST,
		P2027: HttpStatus.INTERNAL_SERVER_ERROR,
	};

	constructor(applicationRef?: HttpServer, errorCodesStatusMapping?: ErrorCodesStatusMapping) {
		super(applicationRef);

		if (errorCodesStatusMapping) {
			this.errorCodesStatusMapping = Object.assign(this.errorCodesStatusMapping, errorCodesStatusMapping);
		}
	}

	catch(exception: Prisma.PrismaClientKnownRequestError | Prisma.NotFoundError | any, host: ArgumentsHost) {
		if (exception instanceof Prisma.PrismaClientKnownRequestError) {
			return this.catchClientKnownRequestError(exception, host);
		}
		if (exception instanceof Prisma.NotFoundError) {
			return this.catchNotFoundError(exception, host);
		}
	}

	private catchClientKnownRequestError(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
		const statusCode = this.errorCodesStatusMapping[exception.code];
		const message = `[${exception.code}]: ${this.exceptionShortMessage(exception.message)}`;

		if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
			return super.catch(exception, host);
		}

		super.catch(new HttpException({ statusCode, message }, statusCode), host);
	}

	private catchNotFoundError({ message }: Prisma.NotFoundError, host: ArgumentsHost) {
		const statusCode = HttpStatus.NOT_FOUND;

		super.catch(new HttpException({ statusCode, message }, statusCode), host);
	}

	private exceptionShortMessage(message: string): string {
		const shortMessage = message.substring(message.indexOf('→'));

		return shortMessage.substring(shortMessage.indexOf('\n')).replace(/\n/g, '').trim();
	}
}
