import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { EPermission } from '@/shared/enums/permission.enum';
import { PermissionGuard } from '@/shared/guards/permissions.guard';

import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';

@ApiTags('users')
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
  @ApiResponse({
    type: User,
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
  })
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateById(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.usersService.update({ _id: id }, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.DELETE_USERS))
  deleteById(@Param('id') id: string) {
    return this.usersService.delete({ _id: id });
  }
}
