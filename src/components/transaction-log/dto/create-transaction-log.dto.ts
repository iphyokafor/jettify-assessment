import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionLogDto {
  @ApiProperty()
  readonly wallet: string;

  @ApiProperty()
  readonly amount: number;

  @ApiProperty()
  readonly transaction_type: string;

  @ApiProperty()
  readonly service: string;

  @ApiProperty()
  readonly created_at: Date;
}
