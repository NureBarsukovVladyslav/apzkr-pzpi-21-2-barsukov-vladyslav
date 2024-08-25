import { Department, StatementEnum, Victim } from "@prisma/client";

export interface GetStatementResponseDto {
	statementId: number;
	victim: Victim;
	department: Department;
	topic: string;
	text: string;
	status: StatementEnum;
	feedback: string | null;
	city: string | null;
	updatedAt: Date;
	createdAt: Date;
}
