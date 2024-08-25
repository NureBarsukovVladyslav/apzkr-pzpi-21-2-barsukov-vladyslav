import { Module } from '@nestjs/common';
import { StatementController } from './statement.controller';
import { StatementService } from './statement.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [StatementController],
	providers: [StatementService],
})
export class StatementModule {}
