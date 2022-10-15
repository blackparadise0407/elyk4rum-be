import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FilterQuery } from 'mongoose';

import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { EPermission } from '@/shared/enums/permission.enum';
import { PermissionGuard } from '@/shared/guards/permissions.guard';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagDocument } from './tags.schema';
import { TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseGuards(PermissionGuard(EPermission.CREATE_TAGS))
  async create(@Body() createTagDto: CreateTagDto) {
    const { name } = createTagDto;
    const normalizedName = name.trim().normalize().toLowerCase();
    const existingTags = await this.tagsService.get({
      name: normalizedName,
    });
    if (existingTags) {
      throw new BadRequestException(
        `Tag name '${normalizedName}' already exist`,
      );
    }
    return this.tagsService.create({
      name: normalizedName,
    });
  }

  @Get()
  findAll(@Query('q') q: string) {
    const filter: FilterQuery<TagDocument> = {};
    if (q) {
      filter.name = new RegExp(q, 'gi');
    }
    return this.tagsService.model.find(filter).limit(10).sort({ name: 'asc' });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.tagsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    // return this.tagsService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.tagsService.remove(+id);
  }
}
