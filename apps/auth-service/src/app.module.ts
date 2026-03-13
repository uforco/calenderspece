import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbconfigModule } from './dbconfig/dbconfig.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DbconfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
