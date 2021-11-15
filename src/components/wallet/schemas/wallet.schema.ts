import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { IUser } from '../../../components/user/schemas/user.schema';

export interface IWallet extends mongoose.Document {
  user: IUser['_id'];
  balance: number;
}

@Schema({ timestamps: true })
export class WalletSchema {
  @ApiProperty()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  @ApiProperty()
  @Prop({ default: 0 })
  balance: number;
}

export const WalletModel = SchemaFactory.createForClass(WalletSchema);
