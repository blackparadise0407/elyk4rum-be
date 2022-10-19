import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

import {
  CAT_DESC_MAX_LENGTH,
  CAT_NAME_MAX_LENGTH,
  CAT_NAME_MIN_LENGTH,
} from '@/shared/models/validation.model';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
  },
})
export class Category {
  @ApiProperty()
  id: string;

  @Transform(({ key, obj }) => obj[key].toString())
  _id: string;

  @Prop({
    maxlength: CAT_NAME_MAX_LENGTH,
    minlength: CAT_NAME_MIN_LENGTH,
    required: true,
  })
  @ApiProperty()
  name: string;

  @Prop({ maxlength: CAT_DESC_MAX_LENGTH, default: '' })
  @ApiProperty()
  description: string;

  @Prop({ unique: true })
  @ApiProperty()
  slug: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
