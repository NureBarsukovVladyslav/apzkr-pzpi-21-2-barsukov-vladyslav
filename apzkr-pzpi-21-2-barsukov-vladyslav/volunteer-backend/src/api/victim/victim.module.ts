import { Module } from '@nestjs/common';
import { VictimController } from './victim.controller';
import { VictimService } from './victim.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [VictimController],
	providers: [VictimService],
})
export class VictimModule {}
