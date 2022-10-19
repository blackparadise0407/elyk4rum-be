import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

import {
  USER_DISP_NAME_MAX_LENGTH,
  USER_DISP_NAME_MIN_LENGTH,
} from '@/shared/models/validation.model';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
  timestamps: false,
  toJSON: {
    virtuals: true,
  },
})
export class User {
  @ApiProperty()
  id: string;

  @Prop({ unique: true })
  @ApiProperty()
  uuid: string;

  @Transform(({ key, obj }) => obj[key].toString())
  _id: string;

  @Prop({
    maxlength: USER_DISP_NAME_MAX_LENGTH,
    minlength: USER_DISP_NAME_MIN_LENGTH,
  })
  @ApiProperty()
  displayName: string;

  @Prop({ unique: true })
  @ApiProperty()
  email: string;

  @Prop()
  @ApiProperty()
  avatarUrl: string;

  @Prop({ index: 1 })
  @ApiProperty()
  auth0Id: string;

  @Prop({ default: true })
  @ApiProperty()
  active: boolean;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Thread' }])
  @ApiProperty({
    type: Array<string>,
  })
  savedThreads: string[] | Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
