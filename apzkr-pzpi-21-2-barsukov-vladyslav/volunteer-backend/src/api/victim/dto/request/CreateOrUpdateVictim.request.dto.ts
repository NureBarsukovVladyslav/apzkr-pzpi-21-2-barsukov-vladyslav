import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { GenderEnum } from '@prisma/client';

export class CreateOrUpdateVictimRequestDto {
	@IsNumber()
	userId: number;

	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
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
}
