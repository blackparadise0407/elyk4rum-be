import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/shared/services/base.service';

import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectModel(User.name) userModel: Model<UserDocument>) {
    super(userModel, true);
  }
}
