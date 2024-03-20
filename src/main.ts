import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

const APP_URL = process.env.APP_URL;
const PORT = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: false,
    },
  });

  app.use(cookieParser());

  //Use validations in all app
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  //Make validation constraints injectable
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  //Handle errors
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(PORT);
  console.log(`Server initialized in ${APP_URL}`);
}

bootstrap();
