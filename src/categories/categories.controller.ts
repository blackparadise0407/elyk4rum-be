import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  // @UseGuards(PermissionGuard(EPermission.READ_CATEGORIES))
  get() {
    return this.categoriesService.getAll();
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(PermissionGuard(EPermission.CREATE_CATEGORIES))
  async create(@Body() payload: CreateCategoryDTO) {
    const category = await this.categoriesService.create(payload);
    return category;
  }

  @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(PermissionGuard(EPermission.UPDATE_CATEGORIES))
  async update(@Param() id: string, @Body() payload: UpdateCategoryDTO) {
    const category = await this.categoriesService.update({ _id: id }, payload);
    return category;
  }

  @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // @UseGuards(PermissionGuard(EPermission.DELETE_CATEGORIES))
  async delete(@Param() id: string, @Query() query: { forced: boolean }) {
    const { forced = false } = query;
    const category = await this.categoriesService.getById(id);
    if (!category) {
      throw new NotFoundException('The deleted resource is not found');
    }
    /**
     * TODO: Check if any threads belongs to this category, delete this category and all related threads if forced = true
     * else delete this category or throw Method not allowed.*/
    return category;
  }
}
