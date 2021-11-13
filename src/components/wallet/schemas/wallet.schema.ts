import * as mongoose from 'mongoose';
import { IUser } from '../../../components/user/schemas/user.schema';
const { Schema } = mongoose;

export interface IWallet extends mongoose.Document {
  user: IUser['_id'];
  balance: number;
}

const WalletSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const WalletModel = WalletSchema;
