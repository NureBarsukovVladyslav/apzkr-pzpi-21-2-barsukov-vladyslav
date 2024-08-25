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
import { QualificationService } from './qualification.service';
import { ApiResponseCompleteOperationInterceptor } from '../../common/interceptors/response/completeOperation.response.interceptor';
import { CreateOrUpdateQualificationRequestDto } from './dto/request/CreateOrUpdateQualification.request.dto';

@Controller('qualification')
export class QualificationController {
	constructor(private readonly qualificationService: QualificationService) {}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/')
	async getQualifications() {
		return await this.qualificationService.getQualifications();
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Post('/')
	async createQualification(@Body() dto: CreateOrUpdateQualificationRequestDto) {
		return await this.qualificationService.createQualification(dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Put('/:id')
	async updateQualification(
		@Param('id', ParseIntPipe) qualificationId: number,
		@Body() dto: CreateOrUpdateQualificationRequestDto,
	) {
		return await this.qualificationService.updateQualification(qualificationId, dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Delete('/:id')
	async deleteQualification(@Param('id', ParseIntPipe) qualificationId: number) {
		return await this.qualificationService.deleteQualification(qualificationId);
	}
}
