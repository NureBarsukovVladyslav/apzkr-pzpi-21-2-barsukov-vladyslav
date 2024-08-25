import { GenderEnum } from '@prisma/client';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrUpdateAdministratorRequestDto {
	@ApiProperty({ example: 1, description: 'ID пользователя' })
	@IsNumber()
	userId: number;

	@ApiPropertyOptional({ type: [String], description: 'IDs департаментов, к которым относится администратор' })
	@IsOptional()
	@IsArray()
	departmentIds: string[] | null;

	@ApiProperty({ example: 'John', description: 'Имя администратора' })
	@IsString()
	name: string;

	@ApiProperty({ example: 'Doe', description: 'Фамилия администратора' })
	@IsString()
	surname: string;

	@ApiProperty({ enum: GenderEnum, description: 'Пол администратора' })
	@IsEnum(GenderEnum)
	gender: GenderEnum;

	@ApiPropertyOptional({ example: '1990-01-01', description: 'Дата рождения администратора' })
	@IsOptional()
	@IsString()
	dateOfBirth: string | null;

	@ApiPropertyOptional({ example: '+1234567890', description: 'Номер телефона' })
	@IsOptional()
	@IsString()
	phoneNumber: string | null;
}
