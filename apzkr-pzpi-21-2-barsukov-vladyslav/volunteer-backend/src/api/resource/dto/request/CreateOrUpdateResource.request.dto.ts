import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrUpdateResourceRequestDto {
	@IsNotEmpty()
	@IsString()
	nameOfResource: string;

	@IsPositive()
	@IsNumber()
	typeOfResourceId: number;

	@IsPositive()
	@IsNumber()
	numberOfResources: number;
}
