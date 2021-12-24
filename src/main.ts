import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // the next two lines did the trick
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // var whitelist = ['example.com', 'api.example.com'];
  const whitelist = process.env.WHITELIST_CORS.split(', ');
  console.log(whitelist);
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });
  // app.enableCors();
  await app.listen(process.env.PORT);
}

bootstrap();
