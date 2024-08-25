import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	UseInterceptors,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { StatementMessageService } from './statement-message.service';
import { ApiResponseCompleteOperationInterceptor } from '../../common/interceptors/response/completeOperation.response.interceptor';
import { CreateOrUpdateStatementMessageRequestDto } from './dto/request/CreateOrUpdateStatementMessage.request.dto';

@Controller('statement-message')
export class StatementMessageController {
	constructor(private readonly statementMessageService: StatementMessageService) {}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@Get('/:id')
	async getStatementMessages(@Param('id', ParseIntPipe) statementId: number) {
		return await this.statementMessageService.getStatementMessages(statementId);
	}

	@UseInterceptors(ApiResponseCompleteOperationInterceptor)
	@UsePipes(new ValidationPipe())
	@Post('/')
	async createStatementMessage(@Body() dto: CreateOrUpdateStatementMessageRequestDto) {
		return await this.statementMessageService.createStatementMessage(dto);
	}
}
