
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { AuthModule } from './auth.module';
import { access } from 'fs';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,private jwtService: JwtService) { }
    c

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    const { password_hash, ...result } = user;
    const isMatch = await bcrypt.compare(pass, password_hash);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
      return {
          access_token: this.jwtService.sign(payload)

    };
  }
}
