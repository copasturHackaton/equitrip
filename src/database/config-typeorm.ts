import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { config } from '../config';

export const configTypeorm = {
  type: config.db.type,
  url: config.db.url,
  entities: config.db.entities,
  migrations: config.db.migrations,
  cli: {
    migrationsDir: config.db.cli.migrationsDir,
    entitiesDir: config.db.cli.entitiesDir,
  },
  synchronize: config.db.synchronize,
  logging: config.db.logging,
} as TypeOrmModuleAsyncOptions;
