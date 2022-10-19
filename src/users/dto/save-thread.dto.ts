import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SaveThreadDto {
  @IsMongoId()
  @IsNotEmpty()
  threadId: string;
}
