import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { THREAD_DESC_MAX_LENGTH } from '@/shared/models/validation.model';

import { OutputBlockData } from '../interfaces/editor.interface';
import { Thread } from '../threads.schema';

interface ICreateThreadDto
  extends Omit<
    Thread,
    'createdBy' | 'category' | 'slug' | 'archived' | 'tags' | 'id'
  > {
  createdBy: string;
  categoryId: string;
}

export class CreateThreadDto implements ICreateThreadDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(THREAD_DESC_MAX_LENGTH)
  description: string;

  @ApiProperty()
  @IsBoolean()
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
  @IsOptional()
  @ApiProperty()
  categoryId: string;

  @IsMongoId({
    each: true,
  })
  @IsOptional()
  @ApiProperty()
  tagIds: string[];

  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  id: string;
}
