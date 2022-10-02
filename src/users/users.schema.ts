import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';

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

  @Prop({ unique: true })
  @ApiProperty()
  username: string;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
