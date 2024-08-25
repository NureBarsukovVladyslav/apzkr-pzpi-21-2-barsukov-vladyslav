import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './common/filters/prismaClientException.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const { httpAdapter } = app.get(HttpAdapterHost);

	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	});

	app.setGlobalPrefix('api');
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

	const config = new DocumentBuilder()
		.setTitle('Volunteer API')
		.setDescription('API for managing volunteers')
		.setVersion('1.0')
		.addTag('volunteers')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api/docs', app, document); // Swagger будет доступен по адресу /api/docs

	await app.listen(3000);
}
bootstrap();
