import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginDto } from '../auth/dto/create-login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user-interface';

import * as bcrypt from 'bcrypt';
import { Payload } from './interfaces/payload.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}
  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }

  async findByPayload(payload: Payload) {
    const { _id, wallet } = payload;
    return await this.userModel.findOne({ _id, wallet });
  }

  async findByCredentials(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('Unable to login', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user);
    } else {
      throw new HttpException('Unable to login', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOneUser(id: string) {
    return await this.userModel.findOne({ _id: id });
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
