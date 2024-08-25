import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as process from 'node:process';

@Injectable()
export class DatabaseService extends PrismaClient {
	async onModuleInit(): Promise<void> {
		await this.$connect();
	}

	async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}

	async enableShutdownHooks(app: INestApplication): Promise<void> {
		process.on('beforeExit', async (): Promise<void> => {
			await app.close();
		});
	}
}
