import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { Category } from '../categories.schema';

type IUpdateCategoryDto = Pick<Category, 'name' | 'description'>;

export class UpdateCategoryDto implements IUpdateCategoryDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;
}
