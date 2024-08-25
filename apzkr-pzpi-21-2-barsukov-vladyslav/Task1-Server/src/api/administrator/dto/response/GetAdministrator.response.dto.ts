import { AdministratorDepartment, GenderEnum, User } from '@prisma/client';

export interface GetAdministratorResponseDto {
	adminId: number;
	user: User;
	AdministratorDepartment: AdministratorDepartment[] | null;
	name: string;
	surname: string;
	gender: GenderEnum;
	dateOfBirth: Date | null;
	phoneNumber: string | null;
	updatedAt: Date;
	createdAt: Date;
}
