import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { GenderEnum } from '@prisma/client';

export class CreateOrUpdateVolunteerRequestDto {
	@IsNumber()
	userId: number;

	@IsOptional()
	@IsArray()
	qualificationIds: string[] | null;

	@IsOptional()
	@IsArray()
	departmentIds: string[] | null;

	@IsString()
	name: string;

	@IsString()
	surname: string;

	@IsEnum(GenderEnum)
	gender: GenderEnum;

	@IsOptional()
	@IsString()
	dateOfBirth: string | null;

	@IsOptional()
	@IsString()
	phoneNumber: string | null;

	@IsOptional()
	@IsString()
	city: string | null;
}
