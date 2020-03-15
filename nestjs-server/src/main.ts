import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Global } from '@nestjs/common';
import { config } from './core/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  global['config'] = config;
  await app.listen(5858);
}
bootstrap();
