import { Module } from '@nestjs/common';
import { QualificationService } from './qualification.service';
import { QualificationController } from './qualification.controller';
import { DatabaseModule } from '../../database/database.module';

@Module({
	imports: [DatabaseModule],
	providers: [QualificationService],
	controllers: [QualificationController],
})
export class QualificationModule {}
