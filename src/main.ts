import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // the next two lines did the trick
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.enableCors();
  await app.listen(process.env.PORT);
}

bootstrap();
