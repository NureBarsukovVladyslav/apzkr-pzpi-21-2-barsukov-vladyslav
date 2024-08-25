import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetVictimResponseDto } from './dto/response/GetVictim.response.dto';
import { CreateOrUpdateVictimRequestDto } from './dto/request/CreateOrUpdateVictim.request.dto';

@Injectable()
export class VictimService {
	constructor(private readonly databaseService: DatabaseService) {}

	async getVictims(): Promise<GetVictimResponseDto[]> {
		return await this.databaseService.victim.findMany({
			include: {
				user: true,
			},
		});
	}

	async createVictim(dto: CreateOrUpdateVictimRequestDto): Promise<GetVictimResponseDto> {
		return await this.databaseService.victim.create({
			data: dto,
			include: {
				user: true,
			},
		});
	}

	async updateVictim(victimId: number, dto: CreateOrUpdateVictimRequestDto): Promise<GetVictimResponseDto> {
		return await this.databaseService.victim.update({
			where: { victimId },
			data: dto,
			include: {
				user: true,
			},
		});
	}

	async deleteVictim(victimId: number): Promise<GetVictimResponseDto> {
		return await this.databaseService.victim.delete({
			where: { victimId },
			include: {
				user: true,
			},
		});
	}
}
