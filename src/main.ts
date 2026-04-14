import * as dotenv from 'dotenv';
dotenv.config();
console.log('Environment variables loaded:', {
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.USER,
  DB_PASSWORD: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  PORT: process.env.PORT,
});
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  
}
bootstrap();
