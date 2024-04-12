import { ApiProperty } from '@nestjs/swagger';

export abstract class PositionType {
  @ApiProperty()
  public lat: number;

  @ApiProperty()
  public lon: number;
}
