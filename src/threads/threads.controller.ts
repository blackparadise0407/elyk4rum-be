import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ThreadsService } from './threads.service';

@ApiTags('threads')
@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}
}
