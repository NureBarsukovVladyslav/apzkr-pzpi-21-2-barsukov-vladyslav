import { RoleEnum } from '@prisma/client';

export interface ResourceParamsDto {
	view: RoleEnum;
	userId: number;
}
