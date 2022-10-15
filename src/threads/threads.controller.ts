import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import slugify from 'slugify';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { CategoriesService } from '@/categories/categories.service';
import { Auth } from '@/shared/decorators/auth.decorator';
import { EPermission } from '@/shared/enums/permission.enum';
import { PermissionGuard } from '@/shared/guards/permissions.guard';
import { UsersService } from '@/users/users.service';

import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './threads.schema';
import { ThreadsService } from './threads.service';

@ApiTags('threads')
@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  @ApiResponse({
    type: [Thread],
  })
  get() {
    return this.threadsService.getAll();
  }

  @Get(':slug')
  @ApiOkResponse({
    type: Thread,
  })
  @ApiNotFoundResponse({ description: 'Thread not found' })
  async getBySlug(@Param('slug') slug: string) {
    const thread = await this.threadsService.get({ slug });
    if (!thread) {
      throw new NotFoundException(
        'The requested resource not found on this server',
      );
    }
    return thread;
  }

  @Post()
  @ApiOkResponse({
    type: Thread,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.CREATE_THREADS))
  async create(
    @Auth('sub') sub: string,
    @Body() { categoryId, title, tagIds, ...body }: CreateThreadDto,
  ) {
    const createdUser = await this.usersService.get({ auth0Id: sub });
    if (!createdUser) {
      throw new BadRequestException('User not found');
    }
    const category = await this.categoriesService.getById(categoryId);
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    const thread = await this.threadsService.create({
      ...body,
      createdBy: createdUser.id,
      category: category._id,
      title: title.trim().normalize(),
      tags: tagIds as any,
      slug:
        slugify(title, { lower: true, strict: true }) +
        '-' +
        Date.now().toString(),
    });
    return thread;
  }

  @Patch(':id')
  @ApiOkResponse({
    type: Thread,
  })
  @ApiNotFoundResponse({ type: 'Not found' })
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.UPDATE_THREADS))
  async updateById(
    @Auth('sub') sub: string,
    @Param('id') id: string,
    @Body() body: UpdateThreadDto,
  ) {
    const thread = await this.threadsService.getById(id);
    console.log(thread);
    if (!thread) {
      throw new NotFoundException(
        'The requested resource not found on this server',
      );
    }
    const createdBy = await this.usersService.get({ auth0Id: sub });

    if (!createdBy) {
      throw new BadRequestException();
    }

    if (thread.createdBy.toString() !== createdBy.id) {
      throw new ForbiddenException();
    }
    thread.set(body);
    await thread.save();
    return thread;
  }
}
