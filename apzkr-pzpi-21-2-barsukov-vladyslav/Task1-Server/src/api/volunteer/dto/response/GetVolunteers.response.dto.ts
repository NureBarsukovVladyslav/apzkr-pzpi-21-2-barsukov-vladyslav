import { GenderEnum, User, VolunteerDepartment, VolunteerQualification } from '@prisma/client';

export interface GetVolunteersResponseDto {
	volunteerId: number;
	user: User;
	VolunteerQualification: VolunteerQualification[] | null;
	VolunteerDepartment: VolunteerDepartment[] | null;
	name: string;
	surname: string;
	gender: GenderEnum;
	dateOfBirth: Date | null;
	phoneNumber: string | null;
	city: string | null;
	updatedAt: Date;
	createdAt: Date;
}
