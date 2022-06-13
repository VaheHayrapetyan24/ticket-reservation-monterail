import { extname } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ext = extname(__filename);
export default {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  database: process.env.DB_DATABASE_NAME || 'postgres',
  password: process.env.DB_PASSWORD || '',
  synchronize: false,
  migrations: [`db/migrations/*${ext}`],
  entities: [`**/*.entity${ext}`],
  cli: {
    migrationsDir: 'db/migrations',
  },
  logging: 'all',
  logger: 'advanced-console',
} as PostgresConnectionOptions;
