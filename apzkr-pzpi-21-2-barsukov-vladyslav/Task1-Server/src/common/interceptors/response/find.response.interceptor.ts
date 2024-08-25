import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ApiResponseFindInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(
			map((data) => {
				if (!data) {
					throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
				}
				return {
					statusCode: HttpStatus.OK,
					message: 'OK',
					data,
				};
			}),
		);
	}
}
