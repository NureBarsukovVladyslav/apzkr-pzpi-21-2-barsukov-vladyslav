import { CanActivate, ExecutionContext, Headers, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import * as process from 'node:process';
import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator';

interface AuthRequestHeaders extends Headers {
	authorization: string;
}

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) return true;

		const request = context.switchToHttp().getRequest();

		const token = this.extractTokenFromHeader(request);

		if (!token) throw new UnauthorizedException();

		try {
			request['user'] = await this.jwtService.verifyAsync(token, {
				secret: process.env.JWT_SECRET,
			});
		} catch {
			throw new UnauthorizedException();
		}

		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = (request.headers as AuthRequestHeaders).authorization?.split(' ') ?? [];

		return type === 'Bearer' ? token : undefined;
	}
}
