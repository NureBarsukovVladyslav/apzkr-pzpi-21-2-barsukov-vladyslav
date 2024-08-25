import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetStatementResponseDto } from './dto/response/GetStatement.response.dto';
import { CreateOrUpdateStatementRequestDto } from './dto/request/CreateOrUpdateStatement.request.dto';
import { StatementParamsDto } from './dto/params/Statement.params.dto';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class StatementService {
	constructor(private readonly databaseService: DatabaseService) {}

	async getStatements(params: StatementParamsDto): Promise<GetStatementResponseDto[]> {
		if (params.view === RoleEnum.VICTIM) {
			const findVictim = await this.databaseService.victim.findUnique({
				where: { userId: Number(params.userId) },
			});

			if (findVictim) {
				return await this.databaseService.statement.findMany({
					where: { victimId: findVictim.victimId },
					include: {
						victim: true,
						department: true,
					},
				});
			}
		} else if (params.view === RoleEnum.VOLUNTEER) {
			const findVolunteer = await this.databaseService.volunteer.findUnique({
				where: { userId: Number(params.userId) },
				include: {
					VolunteerDepartment: true,
				},
			});

			const departmentIds = findVolunteer?.VolunteerDepartment?.map((item) => item.departmentId);

			if (findVolunteer) {
				if (findVolunteer.city) {
					return await this.databaseService.statement.findMany({
						where: {
							departmentId: {
								in: departmentIds,
							},
							city: findVolunteer.city,
						},
						include: {
							victim: true,
							department: true,
						},
					});
				} else {
					return await this.databaseService.statement.findMany({
						where: {
							departmentId: {
								in: departmentIds,
							},
						},
						include: {
							victim: true,
							department: true,
						},
					});
				}
			}
		}

		return await this.databaseService.statement.findMany({
			include: {
				victim: true,
				department: true,
			},
		});
	}

	async getStatement(statementId: number): Promise<GetStatementResponseDto[]> {
		return await this.databaseService.statement.findMany({
			where: { statementId },
			include: {
				victim: true,
				department: true,
			},
		});
	}

	async createStatement(dto: CreateOrUpdateStatementRequestDto): Promise<GetStatementResponseDto> {
		return await this.databaseService.statement.create({
			data: dto,
			include: {
				victim: true,
				department: true,
			},
		});
	}

	async updateStatement(statementId: number, dto: CreateOrUpdateStatementRequestDto): Promise<GetStatementResponseDto> {
		return await this.databaseService.statement.update({
			where: { statementId },
			data: dto,
			include: {
				victim: true,
				department: true,
			},
		});
	}

	async deleteStatement(statementId: number): Promise<GetStatementResponseDto> {
		return await this.databaseService.statement.delete({
			where: { statementId },
			include: {
				victim: true,
				department: true,
			},
		});
	}
}
