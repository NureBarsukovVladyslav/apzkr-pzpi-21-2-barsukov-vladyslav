import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateDepartmentRequestDto {
	@IsNotEmpty()
	@IsString()
	nameOfDepartment: string;

	@IsOptional()
	@IsArray()
	resourceIds: string[] | null;

	@IsString()
	description: string;

	@IsOptional()
	@IsString()
	phoneNumber: string | null;
}
