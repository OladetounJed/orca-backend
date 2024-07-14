// eslint-disable-next-line
require('dotenv').config();
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export enum Environment {
  Development = 'development',
  Production = 'production',
}

export type Config = {
  appName: string;

  env: Environment;

  server: {
    port: number;
    host: string;
  };

  web: {
    url: string;
    bannerUrl: string;
  };

  sha256Secret: string;

  jwt: {
    secret: string;
  };

  telegram: {
    token: string;
    webhookUrl: string;
  };

  database: {
    uri: string;
  };

  redis: {
    uri: string;
  };
};

export const getEnvironmentValue = (key: string, defaultValue?: string): string => {
  const envVal = process.env[key] ?? defaultValue;

  if (!envVal && envVal !== '') {
    throw new Error(`env variable ${key} has to be defined`);
  }

  return envVal;
};

export const config: Config = {
  appName: 'Orca',

  env: getEnvironmentValue('NODE_ENV', 'development') as Config['env'],

  server: {
    port: Number(getEnvironmentValue('PORT', '4000')),
    host: getEnvironmentValue('HOST', 'localhost'),
  },

  sha256Secret: getEnvironmentValue('SHA256_SECRET'),

  jwt: {
    secret: getEnvironmentValue('JWT_SECRET'),
  },

  web: {
    url: getEnvironmentValue('WEB_URL', 'http://localhost:5000'),
    bannerUrl: getEnvironmentValue('BANNER_URL'),
  },

  telegram: {
    token: getEnvironmentValue('TELEGRAM_TOKEN'),
    webhookUrl: getEnvironmentValue('TELEGRAM_WEBHOOK_URL'),
  },

  database: {
    uri: getEnvironmentValue('MONGODB_URI'),
  },

  redis: {
    uri: getEnvironmentValue('REDIS_URI'),
  },
};
