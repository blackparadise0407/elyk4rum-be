import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true, versionKey: false, toJSON: { virtuals: true } })
export class Category {
  id: string;

  @Prop({ maxlength: 50, minlength: 3, required: true })
  name: string;

  @Prop({ maxlength: 200, default: '' })
  description: string;

  createdAt: Date;
  updatedAt: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
