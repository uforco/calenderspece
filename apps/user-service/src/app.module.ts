import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretkeyModule } from './secretkey/secretkey.module';
import { DbconfigModule } from './dbconfig/dbconfig.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SecretkeyModule,
    DbconfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
