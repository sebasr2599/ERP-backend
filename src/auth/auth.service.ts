import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.userService.loginFind(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
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
