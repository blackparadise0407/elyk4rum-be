import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

import {
  CAT_NAME_MAX_LENGTH,
  CAT_NAME_MIN_LENGTH,
} from '@/shared/models/validation.model';

import { Category } from '../categories.schema';

type ICreateCategoryDto = Pick<Category, 'name' | 'description'>;

export class CreateCategoryDto implements ICreateCategoryDto {
  @IsString()
  @MaxLength(CAT_NAME_MAX_LENGTH)
  @MinLength(CAT_NAME_MIN_LENGTH)
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  description: string;
}
