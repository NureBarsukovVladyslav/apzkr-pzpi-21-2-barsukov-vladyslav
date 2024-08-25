import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateTypeOfResourceRequestDto {
	@IsNotEmpty()
	@IsString()
	nameOfType: string;

	@IsOptional()
	@IsString()
	description: string | null;
}
