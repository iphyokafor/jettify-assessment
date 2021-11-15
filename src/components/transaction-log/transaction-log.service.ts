import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITransactionLog } from './schemas/transaction-log.schema';

@Injectable()
export class TransactionLogService {
  constructor(
    @InjectModel('TransactionLog')
    private readonly transactionLogModel: Model<ITransactionLog>,
  ) {}

  async findAll() {
    return this.transactionLogModel.find();
  }

  async findOne(id: string) {
    const transactionLogId = await this.transactionLogModel.findOne({
      _id: id,
    });
    if (!transactionLogId) {
      throw new HttpException(
        'TransactionLog not found!',
        HttpStatus.NOT_FOUND,
      );
    }
    return transactionLogId;
  }
}
