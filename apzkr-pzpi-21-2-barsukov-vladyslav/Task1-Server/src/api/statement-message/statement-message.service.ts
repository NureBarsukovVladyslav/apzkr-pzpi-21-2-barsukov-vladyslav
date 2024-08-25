import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetStatementMessageResponseDto } from './dto/response/GetStatementMessage.response.dto';
import { CreateOrUpdateStatementMessageRequestDto } from './dto/request/CreateOrUpdateStatementMessage.request.dto';

@Injectable()
export class StatementMessageService {
	constructor(private readonly databaseService: DatabaseService) {}

	async getStatementMessages(statementId: number): Promise<GetStatementMessageResponseDto[]> {
		return await this.databaseService.statementMessage.findMany({
			where: { statementId },
			orderBy: {
				messageId: 'asc',
			},
		});
	}

	async createStatementMessage(dto: CreateOrUpdateStatementMessageRequestDto): Promise<GetStatementMessageResponseDto> {
		return await this.databaseService.statementMessage.create({
			data: dto,
		});
	}
}
