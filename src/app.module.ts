import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionLogModule } from './components/transaction-log/transaction-log.module';
import { UserModule } from './components/user/user.module';
import { WalletModule } from './components/wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    UserModule,
    WalletModule,
    TransactionLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
