import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { FundWalletDto } from './dto/fund-wallet.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaymentDto } from './dto/payment-dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('fund')
  @UseGuards(AuthGuard('jwt'))
  fundUserWallet(@Body() fundWalletDto: FundWalletDto, @Request() req) {
    const userId = req.user._id;
    return this.walletService.fundWallet(fundWalletDto, userId);
  }

  @Post('payment')
  @UseGuards(AuthGuard('jwt'))
  makeServicePayment(@Body() paymentDto: PaymentDto, @Request() req) {
    const userId = req.user._id;
    return this.walletService.makePayment(paymentDto, userId);
  }

  @Get()
  findAll() {
    return this.walletService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getUserWalletDetails(@Param('id') id: string) {
    return this.walletService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
