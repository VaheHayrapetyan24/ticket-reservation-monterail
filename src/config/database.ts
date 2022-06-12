import { extname } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ext = extname(__filename);
export default {
  type: 'postgres',
  host: process.env.DB_HOST || '172.18.0.2',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'monterail',
  database: process.env.DB_DATABASE_NAME || 'monterail',
  password: process.env.DB_PASSWORD || 'password',
  synchronize: false,
  migrations: [`db/migrations/*${ext}`],
  entities: [`**/*.entity${ext}`],
  cli: {
    migrationsDir: 'db/migrations',
  },
  logging: 'all',
  logger: 'advanced-console',
} as PostgresConnectionOptions;
