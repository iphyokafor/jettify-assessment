import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

import { LoginDto } from '../auth/dto/create-login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Payload } from './interfaces/payload.interface';
import { IWallet } from '../wallet/schemas/wallet.schema';
import { IUser } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    @InjectModel('Wallet') private readonly walletModel: Model<IWallet>,
    @InjectConnection() private readonly connection: mongoose.Connection,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;
    const user = await this.userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const session = await this.connection.startSession();
    await session.withTransaction(async () => {
      const createdUser = new this.userModel(createUserDto);
      const createWallet = new this.walletModel({ user: createdUser._id });
      const userWallet = await createWallet.save();
      createdUser.wallet = userWallet._id;
      await createdUser.save();
    });
    session.endSession();
    const returnedUser = await this.userModel.findOne({
      email,
    });
    return this.sanitizeUser(returnedUser);
  }

  async findByPayload(payload: Payload) {
    const { userId, walletId } = payload;
    return await this.userModel.findOne({ userId, walletId });
  }

  async findByCredentials(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('Unable to login', HttpStatus.BAD_REQUEST);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Unable to login', HttpStatus.BAD_REQUEST);
    }
  }

  async findOneUser(id: string) {
    const userDetails = await this.userModel.findOne({ _id: id });
    return this.sanitizeUser(userDetails);
  }

  findAll() {
    return `This action returns all user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  sanitizeUser(user: IUser) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }
}
