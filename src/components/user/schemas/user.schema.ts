import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IWallet } from '../../../components/wallet/schemas/wallet.schema';

const { Schema } = mongoose;

export interface IUser extends mongoose.Document {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  password: string;
  wallet: IWallet['_id'];
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
      unique: true,
      required: true,
    },

    first_name: {
      type: String,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    last_name: {
      type: String,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      maxlength: 200,
      required: true,
      trim: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
    },
    phone_number: {
      type: Number,
      maxlength: 11,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    wallet: {
      type: Schema.Types.ObjectId,
      ref: 'Wallet',
    },
    token: {
      type: String,
    },
  },
  { timestamps: true },
);

UserSchema.pre<IUser>('save', async function (next) {
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

export const UserModel = UserSchema;
// export const UserModel = mongoose.model<IUser>('User', UserSchema);
