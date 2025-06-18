import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL
  });
  
  const port = process.env.PORT;
  await app.listen(port || 4000);
}
bootstrap();
