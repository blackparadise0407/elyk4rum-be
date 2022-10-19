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
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Types } from 'mongoose';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Auth } from '@/shared/decorators/auth.decorator';
import { PaginateQueryDto } from '@/shared/dto/paginate-query.dto';
import { ApiOkResponsePaginated } from '@/shared/dto/paginated-result.dto';
import { EPermission } from '@/shared/enums/permission.enum';
import { PermissionGuard } from '@/shared/guards/permissions.guard';
import { AppResponse } from '@/shared/interfaces/shared.interface';

import { SaveThreadDto } from './dto/save-thread.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.schema';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
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

  @Patch('save-thread')
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.UPDATE_USERS))
  async saveThread(
    @Auth('sub') sub: string,
    @Body() saveThreadDto: SaveThreadDto,
  ) {
    const user = await this.usersService.get({ auth0Id: sub });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    const { threadId } = saveThreadDto;
    const savedThreads = user.savedThreads as Types.ObjectId[];
    const foundSavedThreadIdx = savedThreads.findIndex(
      (it) => it.toString() === threadId,
    );

    if (foundSavedThreadIdx > -1) {
      savedThreads.splice(foundSavedThreadIdx, 1);
    } else {
      savedThreads.push(new Types.ObjectId(threadId));
    }
    user.set('savedThreads', savedThreads);
    await user.save();
    return user;
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
