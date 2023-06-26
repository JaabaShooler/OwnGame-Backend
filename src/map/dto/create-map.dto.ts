import { ApiProperty } from '@nestjs/swagger';
import { VISIBILITY } from '../entities/map.entity';

export class CreateMapDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  visibility?: VISIBILITY;
}
