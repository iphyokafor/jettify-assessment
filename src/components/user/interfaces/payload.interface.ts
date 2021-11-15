import { IWallet } from 'src/components/wallet/schemas/wallet.schema';
import { IUser } from '../schemas/user.schema';

export interface Payload {
  userId: IUser['_id'];
  walletId: IWallet['_id'];
}
