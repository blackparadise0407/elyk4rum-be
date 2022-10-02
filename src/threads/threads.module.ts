import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as paginate from 'mongoose-paginate-v2';

import { CategoriesModule } from '@/categories/categories.module';
import { UsersModule } from '@/users/users.module';

import { ThreadsController } from './threads.controller';
import { Thread, ThreadSchema } from './threads.schema';
import { ThreadsService } from './threads.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Thread.name,
        useFactory: () => {
          const schema = ThreadSchema;
          schema.plugin(paginate);
          return schema;
        },
      },
    ]),
    UsersModule,
    forwardRef(() => CategoriesModule),
  ],
  controllers: [ThreadsController],
  providers: [ThreadsService],
  exports: [ThreadsService],
})
export class ThreadsModule {}
