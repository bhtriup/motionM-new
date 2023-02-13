import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  if (!!request.user) {
    return !!data ? request.user[data] : request.user;
  }
});
