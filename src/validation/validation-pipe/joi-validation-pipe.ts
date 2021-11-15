import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/components/user/dto/create-user.dto';
import { IUser } from 'src/components/user/schemas/user.schema';
import { FundWalletDto } from 'src/components/wallet/dto/fund-wallet.dto';
import { PaymentDto } from 'src/components/wallet/dto/payment-dto';
import { IWallet } from 'src/components/wallet/schemas/wallet.schema';
import { fundWalletSchema } from '../validation-schemas/fund-wallet-validation.schema';
import { PaymentSchema } from '../validation-schemas/makepayment-validation.schema';
import { createUserSchema } from '../validation-schemas/user-validation.schema';

@Injectable()
export class UserValidatorPipe implements PipeTransform<IUser, CreateUserDto> {
  public transform(query: IUser, metadata: ArgumentMetadata): CreateUserDto {
    const result = createUserSchema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const validUser = result.value;
    return {
      username: validUser.username,
      first_name: validUser.first_name,
      last_name: validUser.last_name,
      email: validUser.email,
      phone_number: validUser.phone_number,
      password: validUser.password,
    } as CreateUserDto;
  }
}

export class WalletValidatorPipe
  implements PipeTransform<IWallet, FundWalletDto>
{
  public transform(query: IWallet, metadata: ArgumentMetadata): FundWalletDto {
    const result = fundWalletSchema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const validUser = result.value;
    return {
      amount: validUser.amount,
    } as FundWalletDto;
  }
}

export class PaymentValidatorPipe
  implements PipeTransform<IWallet, PaymentDto>
{
  public transform(query: IWallet, metadata: ArgumentMetadata): PaymentDto {
    const result = PaymentSchema.validate(query, {
      convert: true,
    });

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const validUser = result.value;
    return {
      amount: validUser.amount,
      service: validUser.service,
    } as PaymentDto;
  }
}
