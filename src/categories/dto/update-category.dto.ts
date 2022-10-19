import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import {
  CAT_NAME_MAX_LENGTH,
  CAT_NAME_MIN_LENGTH,
} from '@/shared/models/validation.model';

import { Category } from '../categories.schema';

type IUpdateCategoryDto = Pick<Category, 'name' | 'description'>;

export class UpdateCategoryDto implements IUpdateCategoryDto {
  @IsString()
  @MaxLength(CAT_NAME_MAX_LENGTH)
  @MinLength(CAT_NAME_MIN_LENGTH)
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;
}
