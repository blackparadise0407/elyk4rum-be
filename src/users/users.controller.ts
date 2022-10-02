import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PaginateQueryDto } from '@/shared/dto/paginate-query.dto';
import { ApiOkResponsePaginated } from '@/shared/dto/paginated-result.dto';
import { EPermission } from '@/shared/enums/permission.enum';
import { PermissionGuard } from '@/shared/guards/permissions.guard';
import { MongooseClassSerializerInterceptor } from '@/shared/interceptors/mongoose-class-serializer.interceptor';
import { AppResponse } from '@/shared/interfaces/shared.interface';

import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@UseInterceptors(MongooseClassSerializerInterceptor(User))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.READ_USERS))
  @ApiOkResponsePaginated(User)
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  getAll(
    @Query() { pageIndex, pageSize, sortBy, sortOrder }: PaginateQueryDto<User>,
  ) {
    return this.usersService.paginate(
      {},
      {
        page: pageIndex,
        limit: pageSize,
        sort: {
          [sortBy]: sortOrder,
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
  @UseGuards(PermissionGuard(EPermission.UPDATE_USERS))
  async updateById(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.update({ _id: id }, body);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.DELETE_USERS))
  deleteById(@Param('id') id: string) {
    return this.usersService.delete({ _id: id });
  }

  @Patch(':id/deactivate')
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.UPDATE_USERS))
  @ApiOkResponse({
    type: AppResponse,
  })
  async deactivateUser(@Param('id') id: string): Promise<AppResponse> {
    const user = await this.usersService.get({ _id: id });
    if (!user) {
      throw new NotFoundException();
    }
    user.set({ active: false });
    await user.save();
    return { message: 'Deactive user success' };
  }
}
