import { ApiProperty } from '@nestjs/swagger';
import { CreateWalletDto } from 'src/components/wallet/dto/create-wallet.dto';

export class BaseUserDto {
  @ApiProperty()
  readonly _id: string;
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly first_name: string;
  @ApiProperty()
  readonly last_name: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly phone_number: number;
  @ApiProperty()
  password: string;
  wallet: CreateWalletDto;
}
