import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ApiResponseCompleteOperationInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(
			map((data) => {
				if (!data) throw new HttpException('Operation failed', HttpStatus.BAD_REQUEST);

				return {
					statusCode: HttpStatus.OK,
					message: 'OK',
					data,
				};
			}),
		);
	}
}
