import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const WalletSchema = new mongoose.Schema(
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
