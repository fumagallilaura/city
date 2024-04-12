import { ApiProperty } from '@nestjs/swagger';
import { GetAllInput } from '../types/get-all.input';
import { IsOptional } from 'class-validator';

export class GetAllDtoInput implements GetAllInput {
  @ApiProperty({ default: 1, required: false })
  @IsOptional()
  page: number = 1;

  @ApiProperty({ default: 40, required: false })
  @IsOptional()
  limit: number = 40;
}
