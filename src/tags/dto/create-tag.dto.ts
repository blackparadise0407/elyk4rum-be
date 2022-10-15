import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { Tag } from '../tags.schema';

type ICreateTagDto = Pick<Tag, 'name'>;

export class CreateTagDto implements ICreateTagDto {
  @IsString()
  @MaxLength(30)
  @MinLength(3)
  @IsNotEmpty()
  name: string;
}
