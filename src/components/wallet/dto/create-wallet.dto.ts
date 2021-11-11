import { BaseUserDto } from 'src/components/user/dto/base-user.dto';

export class CreateWalletDto {
  user: BaseUserDto;
  balance: number;
}
