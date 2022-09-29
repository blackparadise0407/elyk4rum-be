import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as paginate from 'mongoose-paginate-v2';

import { UsersController } from './users.controller';
import { User, UserSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(paginate);
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
