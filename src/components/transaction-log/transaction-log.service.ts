import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionLogDto } from './dto/create-transaction-log.dto';
import { UpdateTransactionLogDto } from './dto/update-transaction-log.dto';
import { ITransactionLog } from './schemas/transaction-log.schema';

@Injectable()
export class TransactionLogService {
  constructor(
    @InjectModel('TransactionLog')
    private readonly transactionLogModel: Model<ITransactionLog>,
  ) {}
  create(createTransactionLogDto: CreateTransactionLogDto) {
    return 'This action adds a new transactionLog';
  }

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
  // findOne(id: number) {
  //   return `This action returns a #${id} transactionLog`;
  // }

  update(id: number, updateTransactionLogDto: UpdateTransactionLogDto) {
    return `This action updates a #${id} transactionLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} transactionLog`;
  }
}
