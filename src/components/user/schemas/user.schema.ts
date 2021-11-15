import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IWallet } from 'src/components/wallet/schemas/wallet.schema';

export interface IUser extends mongoose.Document {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  password: string;
  wallet: IWallet['_id'];
}

@Schema({ timestamps: true })
export class UserSchema {
  @ApiProperty()
  @Prop({
    unique: true,
    minlength: 3,
    maxlength: 20,
    lowercase: true,
    required: true,
  })
  username: string;

  @ApiProperty()
  @Prop({ minlength: 3, maxlength: 20, lowercase: true, required: true })
  first_name: string;

  @ApiProperty()
  @Prop({ minlength: 3, maxlength: 20, lowercase: true, required: true })
  last_name: string;

  @ApiProperty()
  @Prop({
    lowercase: true,
    maxlength: 200,
    required: true,
    trim: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  })
  email: string;

  @ApiProperty()
  @Prop({ required: true })
  phone_number: number;

  @ApiProperty()
  @Prop({ trim: true, minlength: 8, required: true })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' })
  wallet: string;

  @Prop()
  token: string;
}

export const UserModel = SchemaFactory.createForClass(UserSchema);
