import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LogInRequestDto } from './dto/request/LogIn.request.dto';
import { LogInResponseDto } from './dto/response/LogIn.response.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpRequestDto } from './dto/request/SignUp.request.dto';
import { RoleEnum } from '@prisma/client';
import { DatabaseService } from '../../database/database.service';
import * as process from 'node:process';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private databaseService: DatabaseService,
	) {}

	async logIn(dto: LogInRequestDto): Promise<LogInResponseDto> {
		const findUser = await this.userService.getUser(dto.email);

		if (!findUser.length) throw new HttpException('Not found user', HttpStatus.NOT_FOUND);

		const user = findUser[0];

		const isPasswordMatch = await bcrypt.compare(dto.password, user.password);

		if (!isPasswordMatch) {
			throw new HttpException('Password not match', HttpStatus.BAD_REQUEST);
		}

		const payload = { userId: user.userId, email: user.email, role: user.role };

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async signUp(dto: SignUpRequestDto) {
		const SALT_ROUNDS = process.env.SALT_ROUNDS ? Number(process.env.SALT_ROUNDS) : 10;

		const user = {
			email: dto.email,
			password: await bcrypt.hash(dto.password, SALT_ROUNDS),
			role: dto.role,
		};

		const entity = {
			name: dto.name,
			surname: dto.surname,
			dateOfBirth: dto.dateOfBirth,
			gender: dto.gender,
			city: dto.city ? dto.city : null,
		};

		return this.databaseService.$transaction(async (tx) => {
			const findUser = await tx.user.findFirst({
				where: { email: user.email },
			});

			if (findUser) throw new HttpException('User with this email already exist', HttpStatus.BAD_REQUEST);

			const newUser = await tx.user.create({
				data: user,
			});

			if (dto.role === RoleEnum.VICTIM) {
				await tx.victim.create({
					data: {
						userId: newUser.userId,
						...entity,
					},
				});
			} else if (dto.role === RoleEnum.VOLUNTEER) {
				await tx.volunteer.create({
					data: {
						userId: newUser.userId,
						...entity,
					},
				});
			}

			const payload = { userId: newUser.userId, email: newUser.email, role: newUser.role };

			return {
				access_token: await this.jwtService.signAsync(payload),
			};
		});
	}
}
