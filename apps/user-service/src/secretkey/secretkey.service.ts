import { Injectable } from '@nestjs/common';
import { CreateSecretkeyDto } from './dto/create-secretkey.dto';
import { UpdateSecretkeyDto } from './dto/update-secretkey.dto';
import * as crypto from 'crypto';

@Injectable()
export class SecretkeyService {
  create(createSecretkeyDto: CreateSecretkeyDto) {
    const secretKey = crypto.randomBytes(32).toString('base64url');
    return { ...createSecretkeyDto, secretKey };
  }

  findAll() {
    return `This action returns all secretkey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} secretkey`;
  }

  update(id: number, updateSecretkeyDto: UpdateSecretkeyDto) {
    return `This action updates a #${id} secretkey`;
  }

  remove(id: number) {
    return `This action removes a #${id} secretkey`;
  }
}
