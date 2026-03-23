import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto, SingIn } from './dto/create-auth.dto';
import { DbconfigService } from './dbconfig/dbconfig.service';
import * as argon2 from 'argon2';
import { LogInUserType } from './types/login.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private readonly db: DbconfigService,
    private readonly jwt: JwtService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
  async singup(data: CreateAuthDto) {
    console.log(data);

    const ExceUser = await this.db.rawQuery(
      `SELECT 1 FROM emails WHERE email = $1;`,
      [data.email],
    );
    if (ExceUser) {
      throw new ConflictException({
        message: 'User already exist with this email',
        error: 'USER ALREADY EXISTS',
        data: null,
      });
    }

    // password encode
    const hash = await argon2.hash(data.password);

    // create a new user
    const createUser = await this.db.query('create.user.sql', [
      data.username,
      data.provider ?? 'credentials',
      hash,
      data.email,
    ]);

    console.log(createUser);

    if (createUser?.length == 0 || !createUser)
      throw new NotFoundException('user not created');
    return {
      massage: 'success',
      data: createUser[0] as unknown,
    };
  }

  async singin(data: SingIn) {
    console.log(data);
    const user: LogInUserType[] | null = await this.db.query(
      'singin.user.sql',
      [data.email],
    );
    console.log(user);
    if (!user || user.length == 0) {
      throw new UnauthorizedException({
        message: 'User not found with this email =========',
        error: 'USER_NOT_FOUND',
        data: null,
      });
    }
    const { password, ...res } = user[0];
    const isMatch = await argon2.verify(password, data.password);
    if (!isMatch) {
      throw new UnauthorizedException({
        message: 'invalid credentials',
        error: 'invalid credentials',
        data: null,
      });
    }

    // create JWT Oparetions
    const token = await this.jwt.signAsync(res);

    return {
      access_token: `Bearer_${token}`,
      data: res,
    };
  }
}
