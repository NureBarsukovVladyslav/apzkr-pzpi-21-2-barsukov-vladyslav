import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateOrUpdateResourceRequestDto } from './dto/request/CreateOrUpdateResource.request.dto';
import { GetResourceResponseDto } from './dto/response/GetResource.response.dto';
import { ResourceParamsDto } from './dto/params/Resource.params.dto';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class ResourceService {
	constructor(private readonly databaseService: DatabaseService) {}

	async getResources(params: ResourceParamsDto): Promise<GetResourceResponseDto[]> {
		if (params.view === RoleEnum.VOLUNTEER) {
			const findVolunteer = await this.databaseService.volunteer.findMany({
				where: { userId: Number(params.userId) },
				include: {
					VolunteerDepartment: true,
				},
			});

			if (findVolunteer) {
				const departmentIds = findVolunteer[0].VolunteerDepartment.map((item) => item.departmentId);

				const resources = await this.databaseService.departmentResource.findMany({
					select: {
						resourceId: true,
					},
					where: {
						departmentId: {
							in: departmentIds,
						},
					},
				});

				const resourceIds = resources.map((resource) => resource.resourceId);

				return await this.databaseService.resource.findMany({
					where: {
						resourceId: {
							in: resourceIds,
						},
					},
					include: {
						DepartmentResource: {
							include: {
								department: true,
							},
						},
						typeOfResource: true,
					},
				});
			}
		}

		return await this.databaseService.resource.findMany({
			include: {
				DepartmentResource: {
					include: {
						department: true,
					},
				},
				typeOfResource: true,
			},
		});
	}

	async createResource(dto: CreateOrUpdateResourceRequestDto): Promise<GetResourceResponseDto> {
		return await this.databaseService.resource.create({
			data: dto,
			include: {
				DepartmentResource: {
					include: {
						department: true,
					},
				},
				typeOfResource: true,
			},
		});
	}

	async updateResource(resourceId: number, dto: CreateOrUpdateResourceRequestDto): Promise<GetResourceResponseDto> {
		return await this.databaseService.resource.update({
			where: { resourceId },
			data: dto,
			include: {
				DepartmentResource: {
					include: {
						department: true,
					},
				},
				typeOfResource: true,
			},
		});
	}

	async deleteResource(resourceId: number): Promise<GetResourceResponseDto> {
		return await this.databaseService.resource.delete({
			where: { resourceId },
			include: {
				DepartmentResource: {
					include: {
						department: true,
					},
				},
				typeOfResource: true,
			},
		});
	}
}
