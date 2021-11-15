import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
  @ApiProperty()
  readonly user: string;

  @ApiProperty()
  readonly balance: number;
}
