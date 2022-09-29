import { Controller, Delete, Get, Param } from '@nestjs/common';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getPaginate() {
    return this.usersService.paginate(
      {},
      {
        projection: {
          password: 0,
        },
      },
    );
  }

  @Get(':id')
  getById(@Param() id: string) {
    return this.usersService.getById(id);
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(PermissionGuard(EPermission.DELETE_USERS))
  deleteById(@Param('id') id: string) {
    return this.usersService.delete({ _id: id });
  }
}
