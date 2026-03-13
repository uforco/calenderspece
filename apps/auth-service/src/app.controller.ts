import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('singup')
  singup(@Body() data: CreateAuthDto) {
    console.log(data);
    return data;
  }
}
