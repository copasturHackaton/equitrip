import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const configTypeorm = {
  type: 'mysql',
  url: process.env.DB_URL,
  entities: [path.resolve(__dirname, 'database', 'models', '*')],
  migrations: [path.resolve(__dirname, 'database', 'migrations', '*')],
  cli: {
    migrationsDir: path.resolve(__dirname, 'database', 'migrations'),
    entitiesDir: path.resolve(__dirname, 'database', 'models'),
  },
  autoSchemaSync: true,
  synchronize: true,
  logging: true,
} as TypeOrmModuleAsyncOptions;
