import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetAdministratorResponseDto } from './dto/response/GetAdministrator.response.dto';
import { CreateOrUpdateAdministratorRequestDto } from './dto/request/CreateOrUpdateAdministrator.request.dto';

@Injectable()
export class AdministratorService {
	constructor(private readonly databaseService: DatabaseService) {}

	async getAdministrators(): Promise<GetAdministratorResponseDto[]> {
		return await this.databaseService.administrator.findMany({
			include: {
				user: true,
				AdministratorDepartment: {
					include: {
						department: true,
					},
				},
			},
		});
	}

	async createAdministrator(dto: CreateOrUpdateAdministratorRequestDto): Promise<GetAdministratorResponseDto> {
		const AdministratorDepartment = dto.departmentIds
			? dto.departmentIds.map((department) => {
					return {
						departmentId: Number(department),
					};
			  })
			: [];

		return await this.databaseService.administrator.create({
			data: {
				userId: dto.userId,
				AdministratorDepartment: {
					create: AdministratorDepartment,
				},
				name: dto.name,
				surname: dto.surname,
				gender: dto.gender,
				dateOfBirth: dto.dateOfBirth,
				phoneNumber: dto.phoneNumber,
			},
			include: {
				user: true,
				AdministratorDepartment: {
					include: {
						department: true,
					},
				},
			},
		});
	}

	async updateAdministrator(
		adminId: number,
		dto: CreateOrUpdateAdministratorRequestDto,
	): Promise<GetAdministratorResponseDto> {
		const AdministratorDepartment = dto.departmentIds
			? dto.departmentIds.map((department) => {
					return {
						departmentId: Number(department),
					};
			  })
			: [];

		return await this.databaseService.administrator.update({
			where: { adminId },
			data: {
				userId: dto.userId,
				AdministratorDepartment: {
					deleteMany: {},
					create: AdministratorDepartment,
				},
				name: dto.name,
				surname: dto.surname,
				gender: dto.gender,
				dateOfBirth: dto.dateOfBirth,
				phoneNumber: dto.phoneNumber,
			},
			include: {
				user: true,
				AdministratorDepartment: {
					include: {
						department: true,
					},
				},
			},
		});
	}

	async deleteAdministrator(adminId: number): Promise<GetAdministratorResponseDto> {
		return await this.databaseService.administrator.delete({
			where: { adminId },
			include: {
				user: true,
				AdministratorDepartment: {
					include: {
						department: true,
					},
				},
			},
		});
	}
}
