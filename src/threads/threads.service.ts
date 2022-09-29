import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/shared/services/base.service';

import { Thread, ThreadDocument } from './threads.schema';

@Injectable()
export class ThreadsService extends BaseService<Thread> {
  constructor(
    @InjectModel(Thread.name)
    threadModel: Model<ThreadDocument>,
  ) {
    super(threadModel, true);
  }
}
