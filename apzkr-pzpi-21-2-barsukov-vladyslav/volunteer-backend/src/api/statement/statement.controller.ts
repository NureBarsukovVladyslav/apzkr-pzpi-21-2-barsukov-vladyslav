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
import { StatementService } from './statement.service';
import { ApiResponseCompleteOperationInterceptor } from '../../common/interceptors/response/completeOperation.response.interceptor';
import { CreateOrUpdateStatementRequestDto } from './dto/request/CreateOrUpdateStatement.request.dto';
import { StatementParamsDto } from './dto/params/Statement.params.dto';

@Controller('statement')
export class StatementController {
	constructor(private readonly statementService: StatementService) {}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/')
	async getStatements(@Query() params: StatementParamsDto) {
		return await this.statementService.getStatements(params);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/:id')
	async getStatement(@Param('id', ParseIntPipe) statementId: number) {
		return await this.statementService.getStatement(statementId);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Post('/')
	async createStatement(@Body() dto: CreateOrUpdateStatementRequestDto) {
		return await this.statementService.createStatement(dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Put('/:id')
	async updateStatement(
		@Param('id', ParseIntPipe) statementId: number,
		@Body() dto: CreateOrUpdateStatementRequestDto,
	) {
		return await this.statementService.updateStatement(statementId, dto);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Delete('/:id')
	async deleteStatement(@Param('id', ParseIntPipe) statementId: number) {
		return await this.statementService.deleteStatement(statementId);
	}
}
