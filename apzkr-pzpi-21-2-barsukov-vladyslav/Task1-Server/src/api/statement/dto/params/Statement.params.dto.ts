import { RoleEnum } from '@prisma/client';

export interface StatementParamsDto {
	view: RoleEnum;
	userId: number;
}
