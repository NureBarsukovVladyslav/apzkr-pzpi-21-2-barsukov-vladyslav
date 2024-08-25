import { RoleEnum } from '@prisma/client';
import { IsEnum, IsString, IsNotEmpty, IsStrongPassword, IsOptional } from 'class-validator';

export class CreateOrUpdateUserRequestDto {
	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;

	@IsEnum(RoleEnum)
	role: RoleEnum;
}

export class UpdateUserRequestDto {
	@IsNotEmpty()
	@IsString()
	email: string;

	@IsOptional()
	@IsString()
	password: string | null;

	@IsEnum(RoleEnum)
	role: RoleEnum;
}
