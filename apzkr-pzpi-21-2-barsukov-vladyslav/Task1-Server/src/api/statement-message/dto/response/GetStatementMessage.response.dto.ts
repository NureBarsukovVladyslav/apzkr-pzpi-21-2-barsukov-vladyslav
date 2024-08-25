export interface GetStatementMessageResponseDto {
	messageId: number;
	statementId: number;
	text: string;
	isVictim: boolean;
	updatedAt: Date;
	createdAt: Date;
}
