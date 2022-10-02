import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

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

  @Prop({ maxlength: 50, minlength: 3, required: true })
  @ApiProperty()
  name: string;

  @Prop({ maxlength: 200, default: '' })
  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
