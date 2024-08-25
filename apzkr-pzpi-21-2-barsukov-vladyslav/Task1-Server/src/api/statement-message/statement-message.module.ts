import { Module } from '@nestjs/common';
import { StatementMessageController } from './statement-message.controller';
import { StatementMessageService } from './statement-message.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [StatementMessageController],
	providers: [StatementMessageService],
})
export class StatementMessageModule {}
