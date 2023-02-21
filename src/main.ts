import { getSecretManagerValue, setEnv } from './config/secret-manager';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const configs = await getSecretManagerValue();
  setEnv(JSON.parse(configs.SecretString));
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Mens')
    .setDescription('The Mens API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
