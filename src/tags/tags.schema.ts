import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

import {
  TAG_NAME_MAX_LENGTH,
  TAG_NAME_MIN_LENGTH,
} from '@/shared/models/validation.model';

export type TagDocument = Tag & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
  },
})
export class Tag {
  @ApiProperty()
  id: string;

  @Transform(({ key, obj }) => obj[key].toString())
  _id: string;

  @Prop({
    index: 'text',
    maxlength: TAG_NAME_MAX_LENGTH,
    minlength: TAG_NAME_MIN_LENGTH,
    required: true,
  })
  @ApiProperty()
  name: string;

  createdAt: Date;
  updatedAt: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
