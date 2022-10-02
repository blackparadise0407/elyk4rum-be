import { ApiProperty } from '@nestjs/swagger';
import {
  IsBooleanString,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

import { Thread } from '../threads.schema';

interface ICreateThreadDto
  extends Omit<Thread, 'createdBy' | 'category' | 'slug'> {
  createdBy: string;
  categoryId: string;
}

export class CreateThreadDto implements ICreateThreadDto {
  @IsBooleanString()
  @ApiProperty()
  @IsOptional()
  draft: boolean;

  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  createdBy: string;

  @IsMongoId()
  @ApiProperty()
  categoryId: string;
}
