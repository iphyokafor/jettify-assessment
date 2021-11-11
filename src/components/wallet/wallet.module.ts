import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletSchema } from './schemas/wallet.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [
    MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }]),
  ],
})
export class WalletModule {}
