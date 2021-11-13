import { Module } from '@nestjs/common';
import { TransactionLogService } from './transaction-log.service';
import { TransactionLogController } from './transaction-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModel } from './schemas/transaction-log.schema';

@Module({
  controllers: [TransactionLogController],
  providers: [TransactionLogService],
  imports: [
    MongooseModule.forFeature([
      { name: 'TransactionLog', schema: TransactionModel },
    ]),
  ],
})
export class TransactionLogModule {}
