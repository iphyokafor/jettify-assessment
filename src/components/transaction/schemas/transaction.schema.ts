import * as mongoose from 'mongoose';
const { Schema } = mongoose;

export const TransactionSchema = new mongoose.Schema(
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
      enum: ['Amazon', 'Netflix', 'Ebay', 'Jumia'],
      default: 'None',
    },

    created_at: {
      type: Date,
    },
  },
  { timestamps: true },
);
