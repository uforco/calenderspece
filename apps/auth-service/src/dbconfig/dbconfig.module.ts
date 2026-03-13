import { Module, Global } from '@nestjs/common';
import { DbconfigService } from './dbconfig.service';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Global()
@Module({
  providers: [
    {
      provide: 'PG_POOL',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return new Pool({
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          user: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
        });
      },
    },
    DbconfigService,
  ],
  exports: [DbconfigService],
})
export class DbconfigModule {}
