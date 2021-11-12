import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/components/user/schemas/user.schema';
import { WalletModule } from '../wallet/wallet.module';
import { AuthModule } from '../auth/auth.module';
import { WalletSchema } from '../wallet/schemas/wallet.schema';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    WalletModule,
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Wallet', schema: WalletSchema },
    ]),
  ],

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
