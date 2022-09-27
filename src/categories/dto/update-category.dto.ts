import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { Category } from '../categories.schema';

type IUpdateCategoryDTO = Pick<Category, 'name' | 'description'>;

export class UpdateCategoryDTO implements IUpdateCategoryDTO {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
