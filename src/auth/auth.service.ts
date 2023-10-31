import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // used in local.stategy
  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userService.loginFind(username);
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException();
    }
    const { ...result } = user;
    return result;
  }

  // used in controller
  async loginJWT(id: number, username: string) {
    const payload = { sub: id, username: username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(username: string, pass: string) {
    const user = await this.userService.loginFind(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
