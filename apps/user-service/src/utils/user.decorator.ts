import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserType } from 'src/secretkey/types/x_user.type';

export const XUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const raw = request.headers['x-user'];
    try {
      const userInfo = raw ? (JSON.parse(raw as string) as UserType) : null;
      return userInfo;
    } catch {
      return null;
    }
  },
);
