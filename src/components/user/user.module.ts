import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/components/user/schemas/user.schema';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    WalletModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
})
export class UserModule {}
