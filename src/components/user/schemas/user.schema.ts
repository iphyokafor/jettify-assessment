import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const { Schema } = mongoose;

export const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
      unique: true,
    },

    first_name: {
      type: String,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
    },
    last_name: {
      type: String,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
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

UserSchema.pre('save', async function (next) {
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
