import { ApiProperty } from '@nestjs/swagger';

export class FundWalletDto {
  @ApiProperty()
  amount: number;
}
