import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletModel } from './schemas/wallet.schema';
import { TransactionModel } from '../transaction-log/schemas/transaction-log.schema';
import { UserModel } from '../user/schemas/user.schema';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [
    MongooseModule.forFeature([
      { name: 'Wallet', schema: WalletModel },
      { name: 'User', schema: UserModel },
      { name: 'TransactionLog', schema: TransactionModel },
    ]),
  ],
  exports: [WalletService],
})
export class WalletModule {}
