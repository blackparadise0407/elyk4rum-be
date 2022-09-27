import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

import { Category } from '../categories.schema';

type ICreateCategoryDTO = Pick<Category, 'name' | 'description'>;

export class CreateCategoryDTO implements ICreateCategoryDTO {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
