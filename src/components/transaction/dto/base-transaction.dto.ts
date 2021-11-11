import { CreateWalletDto } from 'src/components/wallet/dto/create-wallet.dto';

export class BaseTransactionDto {
  wallet: CreateWalletDto;
  amount: number;
  transaction_type: string;
  service: string;
  created_at: Date;
}
