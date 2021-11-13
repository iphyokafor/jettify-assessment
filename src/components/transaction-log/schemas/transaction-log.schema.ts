import * as mongoose from 'mongoose';
import { IWallet } from 'src/components/wallet/schemas/wallet.schema';
const { Schema } = mongoose;

export interface ITransactionLog extends mongoose.Document {
  wallet: IWallet['_id'];
  amount: number;
  transaction_type: string;
  service: string;
  created_at: Date;
}

const TransactionLogSchema = new mongoose.Schema(
  {
    wallet: {
      type: Schema.Types.ObjectId,
      ref: 'Wallet',
    },

    amount: {
      type: Number,
    },

    transaction_type: {
      type: String,
      enum: ['Funding', 'Payment'],
      default: 'Funding',
    },

    service: {
      type: String,
      enum: ['Amazon', 'Netflix', 'Ebay', 'Jumia', 'None'],
    },

    created_at: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const TransactionModel = TransactionLogSchema;
