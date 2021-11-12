import { CreateWalletDto } from 'src/components/wallet/dto/create-wallet.dto';

export class BaseTransactionDto {
  readonly wallet: CreateWalletDto;
  readonly amount: number;
  readonly transaction_type: string;
  readonly service: string;
  readonly created_at: Date;
}
