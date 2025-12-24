/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Calculation {
  @Prop({ required: true })
  expression: string;

  @Prop({ required: true })
  result: string;
}

export const CalculationSchema = SchemaFactory.createForClass(Calculation);
