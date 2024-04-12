import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetDistanceDtoInput {
  @ApiProperty()
  @IsString()
  city: string;
}
