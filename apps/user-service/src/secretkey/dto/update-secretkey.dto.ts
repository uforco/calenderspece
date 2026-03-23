import { PartialType } from '@nestjs/mapped-types';
import { CreateSecretkeyDto } from './create-secretkey.dto';

export class UpdateSecretkeyDto extends PartialType(CreateSecretkeyDto) {}
