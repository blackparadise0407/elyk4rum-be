import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import {
  TAG_NAME_MAX_LENGTH,
  TAG_NAME_MIN_LENGTH,
} from '@/shared/models/validation.model';

import { Tag } from '../tags.schema';

type ICreateTagDto = Pick<Tag, 'name'>;

export class CreateTagDto implements ICreateTagDto {
  @IsString()
  @MaxLength(TAG_NAME_MAX_LENGTH)
  @MinLength(TAG_NAME_MIN_LENGTH)
  @IsNotEmpty()
  name: string;
}
