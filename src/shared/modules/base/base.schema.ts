import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema()
export class BaseSchema {
  public _id: ObjectId;

  @Prop({ required: false, default: new Date() })
  public createAt: Date;

  @Prop({ required: false, default: new Date() })
  public updateAt: Date;

  @Prop({ required: false, default: false, select: false })
  public deleted?: boolean;
}
