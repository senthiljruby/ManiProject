import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({ required: true })
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  image: string;

  @Prop()
  description?: string;

  @Prop()
  completedAt?: Date;

  @Prop({ required: true })
  createdAt: Date;

  @Prop()
  deletedAt?: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);