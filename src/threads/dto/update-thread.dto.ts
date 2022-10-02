import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { Thread } from '../threads.schema';

interface IUpdateThreadDto
  extends Pick<Thread, 'content' | 'draft' | 'archived' | 'title'> {
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

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  content: string;
}
