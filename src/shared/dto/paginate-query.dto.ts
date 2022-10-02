import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { SortOrder } from 'mongoose';

export interface IPaginateQuery<T> {
  pageSize: number;
  pageIndex: number;
  sortOrder?: SortOrder;
  sortBy?: keyof T;
}

export class PaginateQueryDto<T> implements IPaginateQuery<T> {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  sortOrder?: SortOrder;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, required: false })
  sortBy?: keyof T;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  pageSize: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  pageIndex: number;
}
