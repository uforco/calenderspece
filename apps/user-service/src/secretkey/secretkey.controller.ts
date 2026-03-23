import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { SecretkeyService } from './secretkey.service';
import { CreateSecretkeyDto } from './dto/create-secretkey.dto';
import { UpdateSecretkeyDto } from './dto/update-secretkey.dto';
import { Request } from 'express';
import { UserType } from './types/x_user.type';

@Controller('secretkey')
export class SecretkeyController {
  constructor(private readonly secretkeyService: SecretkeyService) {}

  @Post()
  create(@Body() createSecretkeyDto: CreateSecretkeyDto, @Req() req: Request) {
    const ht = JSON.stringify(req.headers['x-user']);
    const authUSer = JSON.parse(ht) as string;
    const userInfo = JSON.parse(authUSer) as UserType;

    if (!userInfo || (userInfo && !userInfo.id))
      throw new UnauthorizedException();

    const sKey = this.secretkeyService.create(createSecretkeyDto, userInfo.id);

    console.log({ ...userInfo });

    return sKey;
  }

  @Get()
  findAll() {
    return this.secretkeyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.secretkeyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSecretkeyDto: UpdateSecretkeyDto,
  ) {
    return this.secretkeyService.update(+id, updateSecretkeyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.secretkeyService.remove(+id);
  }
}
