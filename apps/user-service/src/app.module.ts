import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecretkeyModule } from './secretkey/secretkey.module';

@Module({
  imports: [SecretkeyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
