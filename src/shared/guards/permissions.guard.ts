import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

import { EPermission } from '../enums/permission.enum';

export const PermissionGuard = (
  permissions: EPermission | EPermission[],
): Type<CanActivate> => {
  class PermissionGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const req = context.switchToHttp().getRequest<Request>();

      const payload = req.user as JwtPayload & { permissions?: string[] };

      if (!payload) {
        return false;
      }

      if (
        payload.permissions.some((perm) =>
          permissions.includes(perm as EPermission),
        )
      ) {
        return true;
      }

      return false;
    }
  }

  return mixin(PermissionGuardMixin);
};
