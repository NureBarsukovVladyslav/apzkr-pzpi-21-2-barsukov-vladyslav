import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetTypeOfResourceResponseDto } from './dto/response/GetTypeOfResource.response.dto';
import { CreateOrUpdateTypeOfResourceRequestDto } from './dto/request/CreateOrUpdateTypeOfResource.request.dto';

@Injectable()
export class TypeOfResourceService {
	constructor(private readonly databaseService: DatabaseService) {}

	async getTypeOfResources(): Promise<GetTypeOfResourceResponseDto[]> {
		return await this.databaseService.typeOfResource.findMany();
	}

	async createTypeOfResource(dto: CreateOrUpdateTypeOfResourceRequestDto): Promise<GetTypeOfResourceResponseDto> {
		return await this.databaseService.typeOfResource.create({
			data: dto,
		});
	}

	async updateTypeOfResource(
		typeOfResourceId: number,
		dto: CreateOrUpdateTypeOfResourceRequestDto,
	): Promise<GetTypeOfResourceResponseDto> {
		return await this.databaseService.typeOfResource.update({
			where: { typeOfResourceId },
			data: dto,
		});
	}

	async deleteTypeOfResource(typeOfResourceId: number): Promise<GetTypeOfResourceResponseDto> {
		return await this.databaseService.typeOfResource.delete({
			where: { typeOfResourceId },
		});
	}
}
