import { Document } from 'mongoose';
import { CreateWalletDto } from 'src/components/wallet/dto/create-wallet.dto';
import { CreateUserDto } from '../dto/create-user.dto';

export interface IUser extends Document {
  readonly username: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly phone_number: number;
  password: string;
  readonly wallet: CreateWalletDto;
}
