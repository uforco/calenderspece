import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAuthDto, SingIn } from './dto/create-auth.dto';
import { VerifyService } from './verify.service';
import { User } from './decorator/user.decorator';
import { JwtPayload } from './types/login.type';
import { Response } from 'express';
import { LoginGuard } from './GUARDS/login/login.guard';
import { Public } from './decorator/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly verifyService: VerifyService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Post('singup')
  singup(@Body() data: CreateAuthDto) {
    return this.appService.singup(data);
  }

  @Public()
  @Post('singin')
  singin(@Body() data: SingIn) {
    return this.appService.singin(data);
  }

  @UseGuards(LoginGuard)
  @Get('verify')
  async verify(@User() user: JwtPayload, @Res() res: Response) {
    const userInfo = await this.verifyService.verify(user);
    res.set('X-User', JSON.stringify(userInfo));
    return res.sendStatus(200);
  }
}
