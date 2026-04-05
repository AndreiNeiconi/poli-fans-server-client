import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import { env } from 'process';

export const PG_CONNECTION = 'PG_CONNECTION';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: env.DB_USER || 'postgres',
    host: env.DB_HOST || '192.168.0.89',
    database: env.DB_NAME || 'polifans_database',
    password: env.DB_PASS || '12Path12.',
    port: env.DB_PORT ? parseInt(env.DB_PORT) : 5432,
  }),
};

@Global() // Makes the connection available everywhere without re-importing
@Module({
  providers: [dbProvider],
  exports: [PG_CONNECTION],
})
export class DatabaseModule {}