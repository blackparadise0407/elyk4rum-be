import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Schema as MongooseSchema, Types } from 'mongoose';

import { Category } from '@/categories/categories.schema';
import { THREAD_DESC_MAX_LENGTH } from '@/shared/models/validation.model';
import { Tag } from '@/tags/tags.schema';
import { User } from '@/users/users.schema';

import { OutputBlockData } from './interfaces/editor.interface';

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
  @ApiProperty({ required: true })
  title: string;

  @Prop()
  @ApiProperty({ required: true })
  slug: string;

  @Prop()
  @ApiProperty({ default: '', maxLength: THREAD_DESC_MAX_LENGTH })
  description: string;

  @Prop()
  @ApiProperty()
  blocks: OutputBlockData[];

  @Prop({ default: false })
  @ApiProperty()
  draft: boolean;

  @Prop({ default: false })
  @ApiProperty()
  archived: boolean;

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

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Tag' }])
  @Type(() => Array<Tag>)
  @ApiProperty({
    type: Array<Tag>,
  })
  tags: Tag[] | Types.ObjectId[];
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
