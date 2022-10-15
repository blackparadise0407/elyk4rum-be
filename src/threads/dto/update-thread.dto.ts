import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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

interface IUpdateThreadDto
  extends Pick<Thread, 'blocks' | 'draft' | 'archived' | 'title'> {
  categoryId: string;
}

export class UpdateThreadDto implements IUpdateThreadDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  title: string;

  @IsBooleanString()
  @Type(() => Boolean)
  @IsOptional()
  @ApiProperty()
  archived: boolean;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  categoryId: string;

  @IsBooleanString()
  @Type(() => Boolean)
  @IsOptional()
  @ApiProperty()
  draft: boolean;

  @ArrayNotEmpty()
  @IsArray()
  @IsOptional()
  @ApiProperty()
  blocks: OutputBlockData<string, any>[];
}
