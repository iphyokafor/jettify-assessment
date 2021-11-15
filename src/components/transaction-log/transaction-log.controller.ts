import { Controller, Get, Param } from '@nestjs/common';
import { TransactionLogService } from './transaction-log.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('transaction logs')
@Controller('transaction-log')
export class TransactionLogController {
  constructor(private readonly transactionLogService: TransactionLogService) {}

  @Get()
  async findAll() {
    return this.transactionLogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.transactionLogService.findOne(id);
  }
}
