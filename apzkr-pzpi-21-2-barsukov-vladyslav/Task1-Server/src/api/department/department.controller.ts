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
import { DepartmentService } from './department.service';
import { ApiResponseCompleteOperationInterceptor } from '../../common/interceptors/response/completeOperation.response.interceptor';
import { CreateOrUpdateDepartmentRequestDto } from './dto/request/CreateOrUpdateDepartment.request.dto';

@Controller('department')
export class DepartmentController {
	constructor(private readonly departmentService: DepartmentService) {}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/')
	async getDepartments() {
		return await this.departmentService.getDepartments();
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Post('/')
	async createDepartment(@Body() dto: CreateOrUpdateDepartmentRequestDto) {
		return await this.departmentService.createDepartment(dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Put('/:id')
	async updateDepartment(
		@Param('id', ParseIntPipe) departmentId: number,
		@Body() dto: CreateOrUpdateDepartmentRequestDto,
	) {
		return await this.departmentService.updateDepartment(departmentId, dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Delete('/:id')
	async deleteDepartment(@Param('id', ParseIntPipe) departmentId: number) {
		return await this.departmentService.deleteDepartment(departmentId);
	}
}
