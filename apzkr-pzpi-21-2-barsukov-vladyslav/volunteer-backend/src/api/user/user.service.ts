import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetUserResponseDto } from './dto/response/GetUser.response.dto';
import { CreateOrUpdateUserRequestDto, UpdateUserRequestDto } from './dto/request/CreateOrUpdateUser.request.dto';
import * as bcrypt from 'bcrypt';
import * as process from 'node:process';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class UserService {
	constructor(private readonly databaseService: DatabaseService) {}

	async getUsers(): Promise<GetUserResponseDto[]> {
		return await this.databaseService.user.findMany({
			select: {
				userId: true,
				email: true,
				role: true,
				updatedAt: true,
				createdAt: true,
			},
		});
	}

	async getVolunteerUsers(): Promise<GetUserResponseDto[]> {
		return await this.databaseService.user.findMany({
			where: { role: RoleEnum.VOLUNTEER },
			select: {
				Volunteer: true,
				userId: true,
				email: true,
				role: true,
				updatedAt: true,
				createdAt: true,
			},
		});
	}

	async getAdministratorUsers(): Promise<GetUserResponseDto[]> {
		return await this.databaseService.user.findMany({
			where: { role: RoleEnum.ADMINISTRATOR },
			select: {
				Volunteer: true,
				userId: true,
				email: true,
				role: true,
				updatedAt: true,
				createdAt: true,
			},
		});
	}

	async getVictimUsers(): Promise<GetUserResponseDto[]> {
		return await this.databaseService.user.findMany({
			where: { role: RoleEnum.VICTIM },
			select: {
				Volunteer: true,
				userId: true,
				email: true,
				role: true,
				updatedAt: true,
				createdAt: true,
			},
		});
	}

	async getUser(email: string) {
		return await this.databaseService.user.findMany({
			where: { email },
		});
	}

	async createUser(dto: CreateOrUpdateUserRequestDto): Promise<GetUserResponseDto> {
		const SALT_ROUNDS = process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 10;

		const findUser = await this.databaseService.user.findFirst({
			where: { email: dto.email },
		});

		if (findUser) throw new HttpException('A user with this email already exists', HttpStatus.BAD_REQUEST);

		const user: CreateOrUpdateUserRequestDto = {
			email: dto.email,
			password: await bcrypt.hash(dto.password, SALT_ROUNDS),
			role: dto.role,
		};

		return await this.databaseService.user.create({
			select: {
				userId: true,
				email: true,
				role: true,
				updatedAt: true,
				createdAt: true,
			},
			data: user,
		});
	}

	async updateUser(userId: number, dto: UpdateUserRequestDto): Promise<GetUserResponseDto> {
		if (dto.password) {
			return await this.databaseService.user.update({
				select: {
					userId: true,
					email: true,
					role: true,
					updatedAt: true,
					createdAt: true,
				},
				where: { userId },
				data: {
					email: dto.email,
					password: dto.password,
					role: dto.role,
				},
			});
		} else {
			return await this.databaseService.user.update({
				select: {
					userId: true,
					email: true,
					role: true,
					updatedAt: true,
					createdAt: true,
				},
				where: { userId },
				data: {
					email: dto.email,
					role: dto.role,
				},
			});
		}
	}

	async deleteUser(userId: number): Promise<GetUserResponseDto> {
		return await this.databaseService.user.delete({
			select: {
				userId: true,
				email: true,
				role: true,
				updatedAt: true,
				createdAt: true,
			},
			where: { userId },
		});
	}
}
