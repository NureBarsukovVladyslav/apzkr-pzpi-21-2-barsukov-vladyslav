import { IsNotEmpty, IsString } from 'class-validator';

export class LogInRequestDto {
	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}
