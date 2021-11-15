import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserValidatorPipe } from 'src/validation/validation-pipe/joi-validation-pipe';
import { LoginDto } from '../auth/dto/create-login.dto';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiCreatedResponse({ type: CreateUserDto })
  @ApiBadRequestResponse()
  @UsePipes(new UserValidatorPipe())
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const payload = {
      userId: user._id,
      walletId: user.wallet,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  @ApiCreatedResponse({ type: LoginDto })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.findByCredentials(loginDto);
    const payload = {
      userId: user._id,
      walletId: user.wallet,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Get('user-details/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({
    type: CreateUserDto,
    description: 'User details fetched successfully!',
  })
  async getUserDetails(@Param('id') id: string) {
    return this.userService.findOneUser(id);
  }

  @Get('users')
  @ApiOkResponse({ type: CreateUserDto, isArray: true })
  async findAll() {
    return this.userService.findAll();
  }
}
