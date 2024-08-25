import { RoleEnum } from '@prisma/client';

export interface GetUserResponseDto {
	userId: number;
	email: string;
	role: RoleEnum;
	updatedAt: Date;
	createdAt: Date;
}
