import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrUpdateStatementMessageRequestDto {
	@IsNumber()
	statementId: number;

	@IsNotEmpty()
	@IsString()
	text: string;

	@IsBoolean()
	isVictim: boolean;
}
