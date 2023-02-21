import AWS from 'aws-sdk';
import { GetSecretValueResponse } from 'aws-sdk/clients/secretsmanager';

export const getSecretManagerValue = (): Promise<GetSecretValueResponse> => {
  const region = 'us-west-2',
    secretName = process.env.AWS_SECRET_MANAGER;
  const client = new AWS.SecretsManager({ region });
  return client.getSecretValue({ SecretId: secretName }).promise();
};

export const setEnv = (params: object): void => {
  for (const [key, value] of Object.entries(params)) {
    process.env[key] = value;
  }
};
