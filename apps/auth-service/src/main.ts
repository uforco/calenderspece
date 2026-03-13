import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
// import { SwaggerSetting } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // SwaggerSetting(app);

  const port: number = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log('main service running on port', port);
}
void bootstrap();
