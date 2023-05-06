import * as path from 'path';

export const config = {
  app: {
    port: process.env.PORT,
  },
  jwt: {
    privateKey: process.env.JWT_SECRET_KEY,
    ignoreExpirationToken: process.env.IGNORE_EXPIRATION_TOKEN,
  },
  db: {
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
  },
};
