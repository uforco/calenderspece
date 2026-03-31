import { Injectable } from '@nestjs/common';
import { CreateSecretkeyDto } from './dto/create-secretkey.dto';
import { UpdateSecretkeyDto } from './dto/update-secretkey.dto';
import * as crypto from 'crypto';
import { DbconfigService } from 'src/dbconfig/dbconfig.service';

@Injectable()
export class SecretkeyService {
  constructor(private readonly db: DbconfigService) {}

  async create(createSecretkeyDto: CreateSecretkeyDto, user_id: string) {
    const secretKey = crypto.randomBytes(64).toString('base64url');
    const saveData = await this.db.query('create.key.sql', 'secretkey', [
      createSecretkeyDto.name,
      user_id,
      secretKey,
    ]);
    return saveData;
  }

  async getSecretKeys(user_id: string) {
    console.log(user_id);
    const getKeys = await this.db.query('get.keys.sql', 'secretkey', [user_id]);
    console.log(getKeys);
    return `This action returns all secretkey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} secretkey`;
  }

  update(id: number, updateSecretkeyDto: UpdateSecretkeyDto) {
    console.log(updateSecretkeyDto);
    return `This action updates a #${id} secretkey`;
  }

  remove(id: number) {
    return `This action removes a #${id} secretkey`;
  }
}
