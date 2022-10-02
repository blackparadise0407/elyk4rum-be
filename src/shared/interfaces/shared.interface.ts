import { ApiProperty } from '@nestjs/swagger';

export class AppResponse<TData = any> {
  @ApiProperty()
  data?: TData;

  @ApiProperty()
  message: string;
}
