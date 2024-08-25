import { StatementStatusEnum } from '../../../../enum/statementStatus.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateStatementRequestDto {
	@IsNumber()
	victimId: number;

	@IsNumber()
	departmentId: number;

	@IsNotEmpty()
	@IsString()
	topic: string;

	@IsNotEmpty()
	@IsString()
	text: string;

	@IsEnum(StatementStatusEnum)
	status: StatementStatusEnum;

	@IsOptional()
	@IsString()
	feedback: string | null;

	@IsOptional()
	@IsString()
	city: string | null;
}
