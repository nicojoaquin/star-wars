import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: false,
    },
  });

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
  console.log(`Server initialized in port ${PORT}`);
}

bootstrap();
