import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/shared/services/base.service';

import { Category, CategoryDocument } from './categories.schema';

@Injectable()
export class CategoriesService extends BaseService<Category, CategoryDocument> {
  constructor(
    @InjectModel(Category.name)
    categoryModel: Model<CategoryDocument>,
  ) {
    super({ model: categoryModel, paginated: true });
  }
}
