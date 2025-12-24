/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@nestjs/common';
import { Calculation } from './calculation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CalculatorService {
  constructor(
    @InjectModel(Calculation.name)
    private model: Model<Calculation>,
  ) {}

  save(expression: string, result: string) {
    return this.model.create({ expression, result });
  }

  getHistory() {
    return this.model.find().sort({ createdAt: -1 });
  }

  clearHistory() {
    return this.model.deleteMany();
  }

  deleteOne(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
