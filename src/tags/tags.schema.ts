import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

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

  @Prop({ index: 'text', maxlength: 30, minlength: 3, required: true })
  @ApiProperty()
  name: string;

  createdAt: Date;
  updatedAt: Date;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
