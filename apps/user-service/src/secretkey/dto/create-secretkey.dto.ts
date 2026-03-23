import { IsString } from 'class-validator';

export class CreateSecretkeyDto {
  @IsString()
  name: string;
}
