import { Injectable } from '@nestjs/common';
import { Payload } from '../user/interfaces/payload.interface';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  }

  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}
