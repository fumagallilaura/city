import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from 'src/shared/modules/base/base.schema';
import { PositionType } from './types/position.type';
import { IsObject, IsString } from 'class-validator';

@Schema({ timestamps: true, versionKey: false })
export class City extends BaseSchema {
  @Prop({ unique: true, index: true })
  @ApiProperty()
  @IsString()
  public name: string;

  @Prop({ type: PositionType })
  @ApiProperty({ type: PositionType })
  @IsObject()
  public position: PositionType;
}

export const CitySchema = SchemaFactory.createForClass(City);
