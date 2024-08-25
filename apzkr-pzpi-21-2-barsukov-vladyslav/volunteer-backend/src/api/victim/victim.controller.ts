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
import { VictimService } from './victim.service';
import { ApiResponseCompleteOperationInterceptor } from '../../common/interceptors/response/completeOperation.response.interceptor';
import { CreateOrUpdateVictimRequestDto } from './dto/request/CreateOrUpdateVictim.request.dto';

@Controller('victim')
export class VictimController {
	constructor(private readonly victimService: VictimService) {}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/')
	async getVictims() {
		return await this.victimService.getVictims();
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Post('/')
	async createVictim(@Body() dto: CreateOrUpdateVictimRequestDto) {
		return await this.victimService.createVictim(dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Put('/:id')
	async updateVictim(@Param('id', ParseIntPipe) victimId: number, @Body() dto: CreateOrUpdateVictimRequestDto) {
		return await this.victimService.updateVictim(victimId, dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Delete('/:id')
	async deleteVictim(@Param('id', ParseIntPipe) victimId: number) {
		return await this.victimService.deleteVictim(victimId);
	}
}
