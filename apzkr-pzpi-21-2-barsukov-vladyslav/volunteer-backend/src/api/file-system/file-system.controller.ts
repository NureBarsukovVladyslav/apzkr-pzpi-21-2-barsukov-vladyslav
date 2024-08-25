import { Controller, Get, Res } from '@nestjs/common';
import { FileSystemService } from './file-system.service';
import { Response } from 'express';

@Controller('file-system')
export class FileSystemController {
	constructor(private readonly fileSystemService: FileSystemService) {}

	@Get('/statement-report')
	async getStatementReport(@Res() res: Response) {
		return await this.fileSystemService.getStatementReport(res);
	}
}
