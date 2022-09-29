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
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { EPermission } from '@/shared/enums/permission.enum';
import { PermissionGuard } from '@/shared/guards/permissions.guard';

import { Category } from './categories.schema';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { UpdateCategoryDTO } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @UseGuards(PermissionGuard(EPermission.READ_CATEGORIES))
  get() {
    return this.categoriesService.getAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.CREATE_CATEGORIES))
  @ApiCreatedResponse({
    type: Category,
  })
  @ApiForbiddenResponse({
    description: "User doesn't have sufficient permission to create",
  })
  create(@Body() payload: CreateCategoryDTO) {
    return this.categoriesService.create(payload);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.UPDATE_CATEGORIES))
  @ApiOkResponse({
    type: Category,
  })
  @ApiForbiddenResponse({
    description: "User doesn't have sufficient permission to update",
  })
  @ApiNotFoundResponse({
    description: 'Updated category not found',
  })
  async update(@Param() id: string, @Body() payload: UpdateCategoryDTO) {
    const category = await this.categoriesService.update({ _id: id }, payload);
    return category;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.DELETE_CATEGORIES))
  @ApiOkResponse({
    type: Category,
  })
  @ApiForbiddenResponse({
    description: "User doesn't have sufficient permission to update",
  })
  @ApiNotFoundResponse({
    description: 'Updated category not found',
  })
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
