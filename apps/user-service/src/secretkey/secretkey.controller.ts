import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { SecretkeyService } from './secretkey.service';
import { CreateSecretkeyDto } from './dto/create-secretkey.dto';
import { UpdateSecretkeyDto } from './dto/update-secretkey.dto';
import { Request } from 'express';

@Controller('secretkey')
export class SecretkeyController {
  constructor(private readonly secretkeyService: SecretkeyService) {}

  @Post()
  create(@Body() createSecretkeyDto: CreateSecretkeyDto, @Req() req: Request) {
    // console.log('SecretKeyName', data);
    const ht = JSON.stringify(req.headers['x-user']);
    // console.log(ht);
    const authUSer = JSON.parse(ht) as string;
    const sKey = this.secretkeyService.create(createSecretkeyDto);

    const ss = JSON.parse(authUSer) as object;

    console.log({ ...ss, ...sKey });

    return { ...ss, ...sKey };
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
