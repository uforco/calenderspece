import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { DbconfigService } from './dbconfig/dbconfig.service';

@Injectable()
export class AppService {
  constructor(private readonly db: DbconfigService) {}

  getHello(): string {
    return 'Hello World!';
  }
  async singup(data: CreateAuthDto) {
    console.log(data);
    const createUser = await this.db.query('create.user.sql', [data.email]);
    if (createUser?.length == 0 || !createUser)
      throw new NotFoundException('user not created');
    return {
      massage: 'success',
      data: createUser[0] as unknown,
    };
  }
}
