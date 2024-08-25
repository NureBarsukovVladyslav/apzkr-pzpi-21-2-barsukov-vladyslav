import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetDepartmentResponseDto } from './dto/response/GetDepartment.response.dto';
import { CreateOrUpdateDepartmentRequestDto } from './dto/request/CreateOrUpdateDepartment.request.dto';

@Injectable()
export class DepartmentService {
	constructor(private readonly databaseService: DatabaseService) {}

	async getDepartments(): Promise<GetDepartmentResponseDto[]> {
		return await this.databaseService.department.findMany({
			include: {
				DepartmentResource: {
					include: {
						resource: true,
					},
				},
			},
		});
	}

	async createDepartment(dto: CreateOrUpdateDepartmentRequestDto): Promise<GetDepartmentResponseDto> {
		const DepartmentResource = dto.resourceIds
			? dto.resourceIds.map((resource) => {
					return {
						resourceId: Number(resource),
					};
			  })
			: [];

		return await this.databaseService.department.create({
			data: {
				nameOfDepartment: dto.nameOfDepartment,
				description: dto.description,
				phoneNumber: dto.phoneNumber,
				DepartmentResource: {
					create: DepartmentResource,
				},
			},
			include: {
				DepartmentResource: {
					include: {
						resource: true,
					},
				},
			},
		});
	}

	async updateDepartment(
		departmentId: number,
		dto: CreateOrUpdateDepartmentRequestDto,
	): Promise<GetDepartmentResponseDto> {
		const DepartmentResource = dto.resourceIds
			? dto.resourceIds.map((resource) => {
					return {
						resourceId: Number(resource),
					};
			  })
			: [];

		return await this.databaseService.department.update({
			where: { departmentId },
			data: {
				nameOfDepartment: dto.nameOfDepartment,
				description: dto.description,
				phoneNumber: dto.phoneNumber,
				DepartmentResource: {
					deleteMany: {},
					create: DepartmentResource,
				},
			},
			include: {
				DepartmentResource: {
					include: {
						resource: true,
					},
				},
			},
		});
	}

	async deleteDepartment(departmentId: number): Promise<GetDepartmentResponseDto> {
		return await this.databaseService.department.delete({
			where: { departmentId },
			include: {
				DepartmentResource: {
					include: {
						resource: true,
					},
				},
			},
		});
	}
}
