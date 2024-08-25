import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
	imports: [DatabaseModule],
	providers: [AdministratorService],
	controllers: [AdministratorController],
})
export class AdministratorModule {}
