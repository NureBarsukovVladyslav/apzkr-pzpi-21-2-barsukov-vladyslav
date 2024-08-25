import { Body, Controller, HttpCode, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponseCompleteOperationInterceptor } from '../../common/interceptors/response/completeOperation.response.interceptor';
import { LogInRequestDto } from './dto/request/LogIn.request.dto';
import { Public } from '../../common/decorators/public.decorator';
import { SignUpRequestDto } from './dto/request/SignUp.request.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async logIn(@Body() dto: LogInRequestDto) {
		return await this.authService.logIn(dto);
	}

	@Public()
	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Post('signup')
	async signUp(@Body() dto: SignUpRequestDto) {
		const res = await this.authService.signUp(dto);
		console.log(res);
		return res;
	}
}
