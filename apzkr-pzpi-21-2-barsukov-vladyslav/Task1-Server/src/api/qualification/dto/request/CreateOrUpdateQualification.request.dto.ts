import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateQualificationRequestDto {
	@IsNotEmpty()
	@IsString()
	nameOfQualification: string;

	@IsOptional()
	@IsString()
	description: string | null;
}
