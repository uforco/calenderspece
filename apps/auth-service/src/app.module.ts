import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbconfigModule } from './dbconfig/dbconfig.module';
import { JwtModule } from '@nestjs/jwt';
import { VerifyService } from './verify.service';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './GUARDS/login/login.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN,
      signOptions: { expiresIn: '6h' },
    }),
    DbconfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    VerifyService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
  ],
})
export class AppModule {}
