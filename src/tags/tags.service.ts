import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/shared/services/base.service';

import { Tag, TagDocument } from './tags.schema';

@Injectable()
export class TagsService extends BaseService<Tag, TagDocument> {
  constructor(@InjectModel(Tag.name) tagModel: Model<TagDocument>) {
    super({ model: tagModel });
  }
}
