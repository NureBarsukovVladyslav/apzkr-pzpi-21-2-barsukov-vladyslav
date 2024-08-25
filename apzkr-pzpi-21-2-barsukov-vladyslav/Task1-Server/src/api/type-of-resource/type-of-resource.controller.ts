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
import { TypeOfResourceService } from './type-of-resource.service';
import { ApiResponseCompleteOperationInterceptor } from '../../common/interceptors/response/completeOperation.response.interceptor';
import { CreateOrUpdateTypeOfResourceRequestDto } from './dto/request/CreateOrUpdateTypeOfResource.request.dto';

@Controller('type-of-resource')
export class TypeOfResourceController {
	constructor(private readonly typeOfResourceService: TypeOfResourceService) {}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/')
	async getTypeOfResources() {
		return await this.typeOfResourceService.getTypeOfResources();
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Post('/')
	async createTypeOfResource(@Body() dto: CreateOrUpdateTypeOfResourceRequestDto) {
		return await this.typeOfResourceService.createTypeOfResource(dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Put('/:id')
	async updateTypeOfResource(
		@Param('id', ParseIntPipe) typeOfResourceId: number,
		@Body() dto: CreateOrUpdateTypeOfResourceRequestDto,
	) {
		return await this.typeOfResourceService.updateTypeOfResource(typeOfResourceId, dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Delete('/:id')
	async deleteTypeOfResource(@Param('id', ParseIntPipe) typeOfResourceId: number) {
		return await this.typeOfResourceService.deleteTypeOfResource(typeOfResourceId);
	}
}
