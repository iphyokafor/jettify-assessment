import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiCreatedResponse({ type: LoginDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByCredentials(loginDto);
    const payload = {
      userId: user._id,
      walletId: user.wallet,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
