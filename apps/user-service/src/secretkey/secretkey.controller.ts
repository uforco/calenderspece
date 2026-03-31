import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { SecretkeyService } from './secretkey.service';
import { CreateSecretkeyDto } from './dto/create-secretkey.dto';
import { UpdateSecretkeyDto } from './dto/update-secretkey.dto';
import { Request } from 'express';
import { UserType } from './types/x_user.type';
import { XUser } from 'src/utils/user.decorator';

@Controller('secretkey')
export class SecretkeyController {
  constructor(private readonly secretkeyService: SecretkeyService) {}

  @Post()
  create(
    @Body() createSecretkeyDto: CreateSecretkeyDto,
    @XUser() user: UserType,
  ) {
    console.log(user, typeof user);
    if (!user || (user && !user.id)) throw new UnauthorizedException();
    const sKey = this.secretkeyService.create(createSecretkeyDto, user.id);
    return sKey;
  }

  @Get()
  getSecretKeys(@XUser() user: UserType) {
    if (!user || (user && !user.id)) throw new UnauthorizedException();
    return this.secretkeyService.getSecretKeys(user.id);
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
