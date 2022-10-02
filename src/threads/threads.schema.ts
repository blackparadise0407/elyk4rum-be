import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Schema as MongooseSchema, Types } from 'mongoose';

import { Category } from '@/categories/categories.schema';
import { User } from '@/users/users.schema';
export type ThreadDocument = Thread & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
  },
})
export class Thread {
  @Prop()
  @ApiProperty()
  title: string;

  @Prop()
  @ApiProperty()
  slug: string;

  @Prop()
  @ApiProperty()
  content: string;

  @Prop({ default: false })
  @ApiProperty()
  draft: boolean;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Type(() => User)
  @ApiProperty({
    type: User,
  })
  createdBy: User | Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  @Type(() => Category)
  @ApiProperty({
    type: Category,
  })
  category: Category | Types.ObjectId;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
