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
import { VolunteerService } from './volunteer.service';
import { ApiResponseCompleteOperationInterceptor } from '../../common/interceptors/response/completeOperation.response.interceptor';
import { CreateOrUpdateVolunteerRequestDto } from './dto/request/CreateOrUpdateVolunteer.request.dto';

@Controller('volunteer')
export class VolunteerController {
	constructor(private readonly volunteerService: VolunteerService) {}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/')
	async getVolunteers() {
		return await this.volunteerService.getVolunteers();
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Post('/')
	async createVolunteer(@Body() dto: CreateOrUpdateVolunteerRequestDto) {
		return await this.volunteerService.createVolunteer(dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Put('/:id')
	async updateVolunteer(
		@Param('id', ParseIntPipe) volunteerId: number,
		@Body() dto: CreateOrUpdateVolunteerRequestDto,
	) {
		return await this.volunteerService.updateVolunteer(volunteerId, dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Delete('/:id')
	async deleteVolunteer(@Param('id', ParseIntPipe) volunteerId: number) {
		return await this.volunteerService.deleteVolunteer(volunteerId);
	}
}
