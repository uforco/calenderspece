import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, LogInUserType } from './types/login.type';
import { DbconfigService } from './dbconfig/dbconfig.service';

@Injectable()
export class VerifyService {
  constructor(private readonly db: DbconfigService) {}

  async verify(data: JwtPayload) {
    console.log('verify - user system', data);
    if (!data) return { message: 'user not found' };
    const user: LogInUserType[] | null = await this.db.query(
      'singin.user.sql',
      [data.email],
    );
    if (!user || user.length == 0) {
      throw new UnauthorizedException();
    }
    return data;
  }
}
