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
import { AdministratorService } from './administrator.service';
import { ApiResponseCompleteOperationInterceptor } from '../../common/interceptors/response/completeOperation.response.interceptor';
import { CreateOrUpdateAdministratorRequestDto } from './dto/request/CreateOrUpdateAdministrator.request.dto';

@Controller('administrator')
export class AdministratorController {
	constructor(private readonly administratorService: AdministratorService) {}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/')
	async getAdministrators() {
		return await this.administratorService.getAdministrators();
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Post('/')
	async createAdministrator(@Body() dto: CreateOrUpdateAdministratorRequestDto) {
		return await this.administratorService.createAdministrator(dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Put('/:id')
	async updateAdministrator(
		@Param('id', ParseIntPipe) adminId: number,
		@Body() dto: CreateOrUpdateAdministratorRequestDto,
	) {
		return await this.administratorService.updateAdministrator(adminId, dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Delete('/:id')
	async deleteAdministrator(@Param('id', ParseIntPipe) adminId: number) {
		return await this.administratorService.deleteAdministrator(adminId);
	}
}
