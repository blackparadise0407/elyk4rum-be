import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { EPermission } from '@/shared/enums/permission.enum';
import { PermissionGuard } from '@/shared/guards/permissions.guard';
import { MongooseClassSerializerInterceptor } from '@/shared/interceptors/mongoose-class-serializer.interceptor';
import { AppResponse } from '@/shared/interfaces/shared.interface';
import { ThreadsService } from '@/threads/threads.service';

import { Category } from './categories.schema';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
@UseInterceptors(MongooseClassSerializerInterceptor(Category))
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly threadsService: ThreadsService,
  ) {}

  @Get()
  get() {
    return this.categoriesService.getAll();
  }

  @Post()
  @ApiCreatedResponse({
    type: Category,
  })
  @ApiForbiddenResponse({
    description: "User doesn't have sufficient permission to create",
  })
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.CREATE_CATEGORIES))
  create(@Body() { name, description }: CreateCategoryDto) {
    return this.categoriesService.create({
      name: name.trim().normalize(),
      description: description.trim().normalize(),
    });
  }

  @Patch(':id')
  @ApiOkResponse({
    type: Category,
  })
  @ApiForbiddenResponse({
    description: "User doesn't have sufficient permission to update",
  })
  @ApiNotFoundResponse({
    description: 'Updated category not found',
  })
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.UPDATE_CATEGORIES))
  async update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    const category = await this.categoriesService.update({ _id: id }, payload);
    return category;
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOkResponse({
    type: Category,
  })
  @ApiForbiddenResponse({
    description: "User doesn't have sufficient permission to update",
  })
  @ApiNotFoundResponse({
    description: 'Updated category not found',
  })
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.DELETE_CATEGORIES))
  async delete(
    @Param('id') id: string,
    @Query('forced') forced = false,
  ): Promise<AppResponse> {
    const category = await this.categoriesService.getById(id);
    if (!category) {
      throw new NotFoundException('The deleted resource is not found');
    }

    if (forced) {
      await this.threadsService.model.deleteMany({ category });
      await this.categoriesService.delete({ _id: category.id });
      return { message: 'Delete category success' };
    }
    const existingThread = await this.threadsService.get({ category });
    if (existingThread) {
      throw new BadRequestException(
        'Cannot delete category because of relating threads',
      );
    }

    await this.categoriesService.delete({ _id: category.id });
    return { message: 'Delete category success' };
  }
}
