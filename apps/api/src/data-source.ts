import { join } from 'node:path';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity.js';

// Used only by the TypeORM CLI (migrations). Runs against the compiled
// output in dist/, so __dirname resolves to dist/ and globs match .js files.
export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User],
  migrations: [join(__dirname, 'migrations', '*.js')],
});
