import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetVolunteersResponseDto } from './dto/response/GetVolunteers.response.dto';
import { CreateOrUpdateVolunteerRequestDto } from './dto/request/CreateOrUpdateVolunteer.request.dto';

@Injectable()
export class VolunteerService {
	constructor(private readonly databaseService: DatabaseService) {}

	async getVolunteers(): Promise<GetVolunteersResponseDto[]> {
		return await this.databaseService.volunteer.findMany({
			include: {
				user: true,
				VolunteerQualification: {
					include: {
						qualification: true,
					},
				},
				VolunteerDepartment: {
					include: {
						department: true,
					},
				},
			},
		});
	}

	async createVolunteer(dto: CreateOrUpdateVolunteerRequestDto): Promise<GetVolunteersResponseDto> {
		const VolunteerQualification = dto.qualificationIds
			? dto.qualificationIds.map((qualification) => {
					return {
						qualificationId: Number(qualification),
					};
			  })
			: [];

		const VolunteerDepartment = dto.departmentIds
			? dto.departmentIds.map((department) => {
					return {
						departmentId: Number(department),
					};
			  })
			: [];

		return await this.databaseService.volunteer.create({
			data: {
				userId: dto.userId,
				VolunteerQualification: {
					create: VolunteerQualification,
				},
				VolunteerDepartment: {
					create: VolunteerDepartment,
				},
				name: dto.name,
				surname: dto.surname,
				gender: dto.gender,
				dateOfBirth: dto.dateOfBirth,
				phoneNumber: dto.phoneNumber,
				city: dto.city,
			},
			include: {
				user: true,
				VolunteerQualification: {
					include: {
						qualification: true,
					},
				},
				VolunteerDepartment: {
					include: {
						department: true,
					},
				},
			},
		});
	}

	async updateVolunteer(
		volunteerId: number,
		dto: CreateOrUpdateVolunteerRequestDto,
	): Promise<GetVolunteersResponseDto> {
		const VolunteerQualification = dto.qualificationIds
			? dto.qualificationIds.map((qualification) => {
					return {
						qualificationId: Number(qualification),
					};
			  })
			: [];

		const VolunteerDepartment = dto.departmentIds
			? dto.departmentIds.map((department) => {
					return {
						departmentId: Number(department),
					};
			  })
			: [];

		return await this.databaseService.volunteer.update({
			where: { volunteerId },
			data: {
				userId: dto.userId,
				VolunteerQualification: {
					deleteMany: {},
					create: VolunteerQualification,
				},
				VolunteerDepartment: {
					deleteMany: {},
					create: VolunteerDepartment,
				},
				name: dto.name,
				surname: dto.surname,
				gender: dto.gender,
				dateOfBirth: dto.dateOfBirth,
				phoneNumber: dto.phoneNumber,
				city: dto.city,
			},
			include: {
				user: true,
				VolunteerQualification: {
					include: {
						qualification: true,
					},
				},
				VolunteerDepartment: {
					include: {
						department: true,
					},
				},
			},
		});
	}

	async deleteVolunteer(volunteerId: number): Promise<GetVolunteersResponseDto> {
		return await this.databaseService.volunteer.delete({
			where: { volunteerId },
			include: {
				user: true,
				VolunteerQualification: {
					include: {
						qualification: true,
					},
				},
				VolunteerDepartment: {
					include: {
						department: true,
					},
				},
			},
		});
	}
}
