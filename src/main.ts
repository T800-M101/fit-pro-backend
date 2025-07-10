import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppDataSource } from './data-source';
import * as express from 'express';

async function bootstrap() {
  await AppDataSource.initialize();
  console.log('Database connection established');

  const app = await NestFactory.create(AppModule, { bodyParser: false }); 

  app.setGlobalPrefix('api');

  
  app.use('/api/webhooks/webhook', express.raw({ type: 'application/json' }));

  app.use(express.json());

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: process.env.FRONTEND_URL, credentials: true });

  await app.listen(process.env.PORT || 4000);
}
bootstrap();


