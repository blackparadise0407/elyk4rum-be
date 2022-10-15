import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBooleanString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { OutputBlockData } from '../interfaces/editor.interface';
import { Thread } from '../threads.schema';

interface ICreateThreadDto
  extends Omit<
    Thread,
    'createdBy' | 'category' | 'slug' | 'archived' | 'tags'
  > {
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

  @IsArray()
  @ArrayNotEmpty()
  @ApiProperty()
  blocks: OutputBlockData[];

  createdBy: string;

  @IsMongoId()
  @ApiProperty()
  categoryId: string;

  @IsMongoId({
    each: true,
  })
  @IsOptional()
  @ApiProperty()
  tagIds: string[];
}
