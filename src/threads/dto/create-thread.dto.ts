import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { Thread } from '../threads.schema';

interface ICreateThreadDto
  extends Omit<Thread, 'createdBy' | 'category' | 'slug' | 'archived'> {
  createdBy: string;
  categoryId: string;
}

export class CreateThreadDto implements ICreateThreadDto {
  @IsBooleanString()
  @ApiProperty()
  @IsOptional()
  draft: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  content: string;

  createdBy: string;

  @IsMongoId()
  @ApiProperty()
  categoryId: string;
}
