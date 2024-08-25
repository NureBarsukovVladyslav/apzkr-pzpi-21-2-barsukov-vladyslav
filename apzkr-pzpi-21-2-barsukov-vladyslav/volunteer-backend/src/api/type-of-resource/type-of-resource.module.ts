import { Module } from '@nestjs/common';
import { TypeOfResourceController } from './type-of-resource.controller';
import { TypeOfResourceService } from './type-of-resource.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [TypeOfResourceController],
	providers: [TypeOfResourceService],
})
export class TypeOfResourceModule {}
