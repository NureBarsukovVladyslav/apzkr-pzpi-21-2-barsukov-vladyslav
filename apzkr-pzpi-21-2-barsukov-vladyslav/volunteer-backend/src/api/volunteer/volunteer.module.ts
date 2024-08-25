import { Module } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
	imports: [DatabaseModule],
	providers: [VolunteerService],
	controllers: [VolunteerController],
})
export class VolunteerModule {}
