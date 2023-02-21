import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { getSecretManagerValue, setEnv } from './config/secret-manager';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const configs = await getSecretManagerValue();
  setEnv(configs);
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  console.log('server', server);
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
