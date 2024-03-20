import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DATABASE: {
    DB_TYPE: process.env.DB_TYPE,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
  },
  JWT: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN,
  },
  YOUTUBE: {
    YOUTUBE_URL: process.env.YOUTUBE_URL,
    YOUTUBE_KEY: process.env.YOUTUBE_KEY,
  },
};
