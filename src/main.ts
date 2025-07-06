import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { AppDataSource } from './data-source';

async function bootstrap() {

  // 1. Initialize the database connection
  try {
    await AppDataSource.initialize();
    console.log('Database connection established');
  } catch (error) {
    console.error('Database connection or seeding failed:', error);
    process.exit(1);
  }
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe()
  )

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  });

  
 
  
  const port = process.env.PORT;
  await app.listen(port || 4000);
}
bootstrap();

