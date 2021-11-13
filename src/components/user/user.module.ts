import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletModule } from '../wallet/wallet.module';
import { AuthModule } from '../auth/auth.module';
import { WalletModel } from '../wallet/schemas/wallet.schema';
import { UserModel } from './schemas/user.schema';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    WalletModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserModel },
      { name: 'Wallet', schema: WalletModel },
    ]),
  ],

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
