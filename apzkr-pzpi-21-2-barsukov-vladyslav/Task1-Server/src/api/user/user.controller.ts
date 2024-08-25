import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponseCompleteOperationInterceptor } from '../../common/interceptors/response/completeOperation.response.interceptor';
import { CreateOrUpdateUserRequestDto, UpdateUserRequestDto } from './dto/request/CreateOrUpdateUser.request.dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/')
	async getUsers() {
		return await this.userService.getUsers();
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/volunteers')
	async getVolunteerUsers() {
		return await this.userService.getVolunteerUsers();
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/administrators')
	async getAdministratorUsers() {
		return await this.userService.getAdministratorUsers();
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/victims')
	async getVictimUsers() {
		return await this.userService.getVictimUsers();
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Post('/')
	async createUser(@Body() dto: CreateOrUpdateUserRequestDto) {
		return await this.userService.createUser(dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Put('/:id')
	async updateUser(@Param('id', ParseIntPipe) userId: number, @Body() dto: UpdateUserRequestDto) {
		return await this.userService.updateUser(userId, dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Delete('/:id')
	async deleteUser(@Param('id', ParseIntPipe) userId: number) {
		return await this.userService.deleteUser(userId);
	}
}
