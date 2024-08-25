import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetQualificationResponseDto } from './dto/response/GetQualification.response.dto';
import { CreateOrUpdateQualificationRequestDto } from './dto/request/CreateOrUpdateQualification.request.dto';

@Injectable()
export class QualificationService {
	constructor(private readonly databaseService: DatabaseService) {}

	async getQualifications(): Promise<GetQualificationResponseDto[]> {
		return await this.databaseService.qualification.findMany();
	}

	async createQualification(dto: CreateOrUpdateQualificationRequestDto): Promise<GetQualificationResponseDto> {
		return await this.databaseService.qualification.create({
			data: dto,
		});
	}

	async updateQualification(
		qualificationId: number,
		dto: CreateOrUpdateQualificationRequestDto,
	): Promise<GetQualificationResponseDto> {
		return await this.databaseService.qualification.update({
			where: { qualificationId },
			data: dto,
		});
	}

	async deleteQualification(qualificationId: number): Promise<GetQualificationResponseDto> {
		return await this.databaseService.qualification.delete({
			where: { qualificationId },
		});
	}
}
