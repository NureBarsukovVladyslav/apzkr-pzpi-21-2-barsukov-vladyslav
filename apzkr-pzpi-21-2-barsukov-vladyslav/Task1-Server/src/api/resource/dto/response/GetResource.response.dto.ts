import { TypeOfResource, DepartmentResource } from '@prisma/client';

export interface GetResourceResponseDto {
	resourceId: number;
	nameOfResource: string;
	DepartmentResource: DepartmentResource[];
	typeOfResource: TypeOfResource | null;
	numberOfResources: number;
	updatedAt: Date;
	createdAt: Date;
}
