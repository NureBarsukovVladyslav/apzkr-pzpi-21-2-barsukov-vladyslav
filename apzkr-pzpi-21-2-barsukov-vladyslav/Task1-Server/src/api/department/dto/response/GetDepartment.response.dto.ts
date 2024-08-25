import { DepartmentResource } from '@prisma/client';

export interface GetDepartmentResponseDto {
	departmentId: number;
	nameOfDepartment: string;
	DepartmentResource: DepartmentResource[] | null;
	description: string | null;
	phoneNumber: string | null;
	updatedAt: Date;
	createdAt: Date;
}
