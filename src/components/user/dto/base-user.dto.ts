import { CreateWalletDto } from 'src/components/wallet/dto/create-wallet.dto';

export class BaseUserDto {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number;
  password: string;
  wallet: CreateWalletDto;
}
