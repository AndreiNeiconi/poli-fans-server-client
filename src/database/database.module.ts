import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';

export const PG_CONNECTION = 'PG_CONNECTION';

@Global()
@Module({
  providers: [
    {
      provide: PG_CONNECTION,
      useFactory: () => {
        // useFactory is better because it allows for logic before returning the object
        return new Pool({
          user: process.env.DB_USER ,
          host: process.env.DB_HOST ,
          database: process.env.DB_NAME,
          password: process.env.DB_PASS ,
          port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
        });
      },
    },
  ],
  exports: [PG_CONNECTION],
})
export class DatabaseModule {}