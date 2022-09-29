import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { Category } from '../categories.schema';

type ICreateCategoryDTO = Pick<Category, 'name' | 'description'>;

export class CreateCategoryDTO implements ICreateCategoryDTO {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;
}
