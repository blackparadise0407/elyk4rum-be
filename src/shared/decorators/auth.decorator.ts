import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Auth = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    console.log(request.user);
    return request.user[data] ?? request.user;
  },
);
