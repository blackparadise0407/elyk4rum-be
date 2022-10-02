import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

import { Thread } from '../threads.schema';

interface IUpdateThreadDto extends Pick<Thread, 'content' | 'draft'> {
  categoryId: string;
}

export class UpdateThreadDto implements IUpdateThreadDto {
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
  @IsOptional()
  @ApiProperty()
  content: string;
}
