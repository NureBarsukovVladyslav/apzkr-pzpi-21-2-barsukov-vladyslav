import { GenderEnum, User } from '@prisma/client';

export interface GetVictimResponseDto {
	victimId: number;
	user: User;
	name: string;
	surname: string;
	gender: GenderEnum;
	dateOfBirth: Date | null;
	phoneNumber: string | null;
	updatedAt: Date;
	createdAt: Date;
}
