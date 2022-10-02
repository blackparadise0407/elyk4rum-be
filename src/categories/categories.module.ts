import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as paginate from 'mongoose-paginate-v2';

import { ThreadsModule } from '@/threads/threads.module';

import { CategoriesController } from './categories.controller';
import { Category, CategorySchema } from './categories.schema';
import { CategoriesService } from './categories.service';

@Module({
  imports: [
    forwardRef(() => ThreadsModule),
    MongooseModule.forFeatureAsync([
      {
        name: Category.name,
        useFactory: () => {
          const schema = CategorySchema;
          schema.plugin(paginate);
          return schema;
        },
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
