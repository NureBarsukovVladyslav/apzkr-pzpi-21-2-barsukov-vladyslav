export interface GetQualificationResponseDto {
	qualificationId: number;
	nameOfQualification: string;
	description: string | null;
	updatedAt: Date;
	createdAt: Date;
}
