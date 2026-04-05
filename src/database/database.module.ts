import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';

export const PG_CONNECTION = 'PG_CONNECTION';

const dbProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: 'postgres',
    host: '192.168.0.89',
    database: 'polifans_database',
    password: '12Path12.',
    port: 5432,
  }),
};

@Global() // Makes the connection available everywhere without re-importing
@Module({
  providers: [dbProvider],
  exports: [PG_CONNECTION],
})
export class DatabaseModule {}