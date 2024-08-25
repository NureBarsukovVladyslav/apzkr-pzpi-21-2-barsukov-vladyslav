export interface GetTypeOfResourceResponseDto {
	typeOfResourceId: number;
	nameOfType: string;
	description: string | null;
	updatedAt: Date;
	createdAt: Date;
}
