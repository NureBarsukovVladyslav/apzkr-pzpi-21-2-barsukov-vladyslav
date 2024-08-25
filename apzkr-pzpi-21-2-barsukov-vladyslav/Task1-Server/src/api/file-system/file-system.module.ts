import { Module } from '@nestjs/common';
import { FileSystemController } from './file-system.controller';
import { FileSystemService } from './file-system.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [FileSystemController],
	providers: [FileSystemService],
})
export class FileSystemModule {}
