import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  UsePipes,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { FundWalletDto } from './dto/fund-wallet.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaymentDto } from './dto/payment-dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  PaymentValidatorPipe,
  WalletValidatorPipe,
} from 'src/validation/validation-pipe/joi-validation-pipe';
import { CreateWalletDto } from './dto/create-wallet.dto';

@ApiTags('wallets')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('fund')
  @UsePipes(new WalletValidatorPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: CreateWalletDto,
    description: 'Wallet funded successfully',
  })
  @ApiBearerAuth()
  async fundUserWallet(@Body() fundWalletDto: FundWalletDto, @Request() req) {
    const userId = req.user._id;
    return this.walletService.fundWallet(fundWalletDto, userId);
  }

  @Post('payment')
  @UsePipes(new PaymentValidatorPipe())
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: CreateWalletDto,
    description: 'Payment made successfully',
  })
  @ApiForbiddenResponse({
    description: 'Oops! Insufficient balance!',
  })
  @ApiBearerAuth()
  async makeServicePayment(@Body() paymentDto: PaymentDto, @Request() req) {
    const userId = req.user._id;
    return this.walletService.makePayment(paymentDto, userId);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({
    type: CreateWalletDto,
    description: 'Get user wallet details by id',
  })
  @ApiNotFoundResponse({ description: 'Wallet not found!' })
  @ApiBearerAuth()
  async getUserWalletDetails(@Param('id') id: string) {
    return this.walletService.findOne(id);
  }
}
