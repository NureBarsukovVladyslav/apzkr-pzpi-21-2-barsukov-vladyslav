import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { DatabaseService } from '../../database/database.service';
import { StatementStatusEnum } from '../../enum/statementStatus.enum';

@Injectable()
export class FileSystemService {
	constructor(private readonly databaseService: DatabaseService) {}

	async getStatementReport(res: Response) {
		const dateNow = new Date();

		const firstDay = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);
		const lastDay = new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 0);

		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Report');

		worksheet.columns = [
			{ header: 'Statement id', key: 'statementId' },
			{ header: 'Victim', key: 'victim' },
			{ header: 'Topic', key: 'topic' },
			{ header: 'Text', key: 'text' },
			{ header: 'Status', key: 'status' },
			{ header: 'Feedback', key: 'feedback' },
			{ header: 'Created at', key: 'createdAt' },
		];

		const statements = await this.databaseService.statement.findMany({
			select: {
				statementId: true,
				victim: true,
				topic: true,
				text: true,
				status: true,
				feedback: true,
				createdAt: true,
			},
			where: {
				status: StatementStatusEnum.CLOSED,
				createdAt: {
					gte: firstDay,
					lte: lastDay,
				},
			},
		});

		const resultStatements = statements.map((statement) => {
			return {
				...statement,
				victim: `${statement.victim.name} ${statement.victim.surname}`,
			};
		});

		await worksheet.addRows(resultStatements);

		const buffer = await workbook.xlsx.writeBuffer();
		res.header('Content-Disposition', `attachment; filename=statement-report.xlsx`);
		res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		res.send(buffer);
	}
}
