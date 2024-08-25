import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GenderEnum, RoleEnum } from '@prisma/client';

export class SignUpRequestDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsNotEmpty()
	@IsString()
	surname: string;

	@IsOptional()
	@IsString()
	dateOfBirth: string | null;

	@IsEnum(GenderEnum)
	gender: GenderEnum;

	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsNotEmpty()
	@IsString()
	confirmPassword: string;

	@IsEnum(RoleEnum)
	role: RoleEnum;

	@IsOptional()
	@IsString()
	city: string | undefined;
}
