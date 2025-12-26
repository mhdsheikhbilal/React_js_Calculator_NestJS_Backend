/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/guards/jwt-auth/jwt-auth.guard';
import { CalculatorService } from './calculator.service';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('calculator')
export class CalculatorController {
  constructor(private service: CalculatorService) {}

  @Post()
  save(@Body() body) {
    return this.service.save(body.expression, body.result);
  }

  @Get()
  getHistory() {
    return this.service.getHistory();
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete()
  clear() {
    return this.service.clearHistory();
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.service.deleteOne(id);
  }
}
