import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	Query,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ApiResponseCompleteOperationInterceptor } from '../../common/interceptors/response/completeOperation.response.interceptor';
import { CreateOrUpdateResourceRequestDto } from './dto/request/CreateOrUpdateResource.request.dto';
import { ResourceParamsDto } from './dto/params/Resource.params.dto';

@Controller('resource')
export class ResourceController {
	constructor(private readonly resourceService: ResourceService) {}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/')
	async getResources(@Query() params: ResourceParamsDto) {
		return await this.resourceService.getResources(params);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Post('/')
	async createResource(@Body() dto: CreateOrUpdateResourceRequestDto) {
		return await this.resourceService.createResource(dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Put('/:id')
	async updateResource(@Param('id', ParseIntPipe) resourceId: number, @Body() dto: CreateOrUpdateResourceRequestDto) {
		return await this.resourceService.updateResource(resourceId, dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Delete('/:id')
	async deleteResource(@Param('id', ParseIntPipe) resourceId: number) {
		return await this.resourceService.deleteResource(resourceId);
	}
}
