import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IWallet } from 'src/components/wallet/schemas/wallet.schema';

export interface ITransactionLog extends mongoose.Document {
  wallet: IWallet['_id'];
  amount: number;
  transaction_type: string;
  service: string;
  created_at: Date;
}

@Schema({ timestamps: true })
export class TransactionLogSchema {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' })
  wallet: string;

  @ApiProperty()
  @Prop()
  amount: number;

  @ApiProperty()
  @Prop({ enum: ['Funding', 'Payment'], default: 'Funding' })
  transaction_type: string;

  @ApiProperty()
  @Prop({ enum: ['Amazon', 'Netflix', 'Ebay', 'Jumia', 'None'] })
  service: string;

  @ApiProperty()
  @Prop()
  created_at: Date;
}

export const TransactionModel =
  SchemaFactory.createForClass(TransactionLogSchema);
