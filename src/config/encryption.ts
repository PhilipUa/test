import MUUID from 'uuid-mongodb';

export default () => {
  const encryptTypeStr = {
    encrypt: {
      keyId: [MUUID.from(process.env.DB_UUID_KEY)],
      bsonType: 'string',
      algorithm: process.env.DB_ENCRYPT_ALGORITHM_DETERMINISTIC,
    },
  };
  const encryptTypeArr = {
    encrypt: {
      keyId: [MUUID.from(process.env.DB_UUID_KEY)],
      bsonType: 'array',
      algorithm: process.env.DB_ENCRYPT_ALGORITHM_RANDOM,
    },
  };
  return {
    autoEncryption: {
      keyVaultNamespace: process.env.DB_KEYS,
      extraOptions: {
        mongocryptdSpawnArgs: ['--pidfilepath=/tmp/mongocryptd.pid'],
      },
      kmsProviders: {
        aws: {
          accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
          secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
          sessionToken: process.env['AWS_SESSION_TOKEN'],
        },
      },
      schemaMap: {
        [`${process.env.DB_NAME}.users`]: {
          bsonType: 'object',
          properties: {
            email: encryptTypeStr,
            firstName: encryptTypeStr,
            lastName: encryptTypeStr,
            phone: encryptTypeStr,
            logs: encryptTypeArr,
          },
        },
      },
    },
  };
};
