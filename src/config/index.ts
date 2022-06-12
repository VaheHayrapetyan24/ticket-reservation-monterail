import * as dotenv from 'dotenv';
import database from './database';

dotenv.config();

const auth = {
  jwtSecret: process.env.JWT_SECRET || '',
};

const config = Object.freeze({
  auth,
  database,
  apiPrefix: process.env.API_PREFIX || '',
  port: process.env.PORT || 4000,
});

export default config;
