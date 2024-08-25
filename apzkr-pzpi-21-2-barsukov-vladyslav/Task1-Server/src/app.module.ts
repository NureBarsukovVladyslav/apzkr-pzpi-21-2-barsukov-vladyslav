import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './api/auth/auth.guard';
import { VolunteerModule } from './api/volunteer/volunteer.module';
import { QualificationModule } from './api/qualification/qualification.module';
import { TypeOfResourceModule } from './api/type-of-resource/type-of-resource.module';
import { ResourceModule } from './api/resource/resource.module';
import { DepartmentModule } from './api/department/department.module';
import { AdministratorModule } from './api/administrator/administrator.module';
import { VictimModule } from './api/victim/victim.module';
import { StatementModule } from './api/statement/statement.module';
import { StatementMessageModule } from './api/statement-message/statement-message.module';
import { FileSystemModule } from './api/file-system/file-system.module';

@Module({
	imports: [
		DatabaseModule,
		UserModule,
		AuthModule,
		ConfigModule.forRoot(),
		VolunteerModule,
		QualificationModule,
		TypeOfResourceModule,
		ResourceModule,
		DepartmentModule,
		AdministratorModule,
		VictimModule,
		StatementModule,
		StatementMessageModule,
		FileSystemModule,
	],
	controllers: [AppController],
	providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
