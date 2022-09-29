import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
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
  id: string;

  @Prop()
  email: string;

  @Prop()
  @Exclude()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
