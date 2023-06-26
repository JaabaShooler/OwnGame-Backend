import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty()
  categoryName: string;

  @ApiProperty()
  orderX: number;

  @ApiProperty()
  orderY: number;

  @ApiProperty()
  cost: number;

  @ApiProperty()
  round: number;

  @ApiProperty()
  text: string;
}
