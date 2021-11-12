import { CreateUserDto } from 'src/components/user/dto/create-user.dto';

export class CreateWalletDto {
  readonly user: CreateUserDto;
  readonly balance: number;
}
