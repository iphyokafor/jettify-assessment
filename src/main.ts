import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

dotenv.config();

const port = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Jettify-assessment API')
    .setDescription('All API endpoints for jettify assessment')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);

  app.enableCors();
  await app.listen(port);
  Logger.log(
    `Server running on http://localhost:${port} in ${process.env.NODE_ENV} mode \nPress CTRL-C to stop`,
    'Bootstrap',
  );
}
bootstrap();
