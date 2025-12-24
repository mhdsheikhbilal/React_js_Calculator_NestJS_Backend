/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalculatorService } from './calculator.service';
import { CalculatorController } from './calculator.controller';
import { Calculation, CalculationSchema } from './calculation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Calculation.name, schema: CalculationSchema },
    ]),
  ],
  providers: [CalculatorService],
  controllers: [CalculatorController],
})
export class CalculatorModule {}
