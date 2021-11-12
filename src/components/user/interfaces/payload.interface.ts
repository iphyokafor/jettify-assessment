import { CreateWalletDto } from 'src/components/wallet/dto/create-wallet.dto';
import { CreateUserDto } from '../dto/create-user.dto';

export interface Payload {
  _id: CreateUserDto;
  wallet: CreateWalletDto;
}
