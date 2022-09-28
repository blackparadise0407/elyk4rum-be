import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ThreadDocument = Thread & Document;

@Schema()
export class Thread {
  @Prop()
  title: string;

  @Prop()
  slug: string;

  @Prop()
  content: string;

  @Prop({ index: 1 })
  createdById: string;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);
