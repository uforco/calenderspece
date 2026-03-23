import { Module } from '@nestjs/common';
import { SecretkeyService } from './secretkey.service';
import { SecretkeyController } from './secretkey.controller';

@Module({
  controllers: [SecretkeyController],
  providers: [SecretkeyService],
})
export class SecretkeyModule {}
