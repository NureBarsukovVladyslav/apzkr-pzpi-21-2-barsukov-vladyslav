import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import * as process from 'node:process';
import { DatabaseModule } from '../../database/database.module';

@Module({
	imports: [
		DatabaseModule,
		UserModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '1d' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [AuthService],
})
export class AuthModule {}
