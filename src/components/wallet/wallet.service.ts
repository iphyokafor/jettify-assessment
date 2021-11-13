import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITransactionLog } from '../transaction-log/schemas/transaction-log.schema';
import { IUser } from '../user/schemas/user.schema';
import { FundWalletDto } from './dto/fund-wallet.dto';
import { PaymentDto } from './dto/payment-dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { IWallet } from './schemas/wallet.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<IWallet>,
    @InjectModel('TransactionLog')
    private readonly transactionLogModel: Model<ITransactionLog>,
    @InjectModel('User') private readonly userModel: Model<IUser>,
  ) {}

  async fundWallet(fundWalletDto: FundWalletDto, id: string) {
    const userId = await this.userModel.findOne({ _id: id });
    const { amount } = fundWalletDto;

    if (amount < 1000) {
      throw new HttpException(
        'Amount must be greater than or equal to 1000',
        HttpStatus.BAD_REQUEST,
      );
    }
    const walletDetail = await this.walletModel.findOne({
      user: userId,
    });

    const { balance, user } = walletDetail;
    const newBalance = Number(balance + amount);

    const walletInfo = await this.walletModel.findOneAndUpdate(
      {
        user: userId,
      },
      {
        $set: {
          balance: newBalance,
        },
      },
      {
        new: true,
      },
    );

    await this.transactionLogModel.create({
      wallet: user,
      amount: amount,
      transaction_type: 'Funding',
      service: 'None',
      created_at: Date.now(),
    });

    return walletInfo;
  }

  async makePayment(paymentDto: PaymentDto, id: string) {
    const userId = await this.userModel.findOne({ _id: id });
    const { amount, service } = paymentDto;

    const walletDetail = await this.walletModel.findOne({
      user: userId,
    });

    const { balance, user } = walletDetail;

    if (balance < amount) {
      throw new HttpException(
        'Oops! Insufficient balance!',
        HttpStatus.FORBIDDEN,
      );
    }
    const newBalance = Number(balance - amount);

    const walletInfo = await this.walletModel.findOneAndUpdate(
      {
        user: userId,
      },
      {
        $set: {
          balance: newBalance,
        },
      },
      {
        new: true,
      },
    );

    await this.transactionLogModel.create({
      wallet: user,
      amount: amount,
      transaction_type: 'Payment',
      service: service,
      created_at: Date.now(),
    });

    return walletInfo;
  }

  findAll() {
    return `This action returns all wallet`;
  }

  findOne(id: string) {
    return this.walletModel.findOne({ _id: id });
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
