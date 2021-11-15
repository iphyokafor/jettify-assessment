import { forwardRef, Module } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
    MongooseModule.forFeatureAsync([
      {
        name: 'User',
        useFactory: () => {
          const schema = UserModel;
          schema.pre('save', async function (next) {
            try {
              if (!this.isModified('password')) {
                return next();
              }
              const hashed = await bcrypt.hash(this['password'], 10);
              this['password'] = hashed;
              return next();
            } catch (err) {
              return next(err);
            }
          });

          return schema;
        },
      },
    ]),
  ],

  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
