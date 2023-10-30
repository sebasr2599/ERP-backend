import { Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guards';
import { JWTAuthGuard } from './jwt-auth.guard';
// import { AuthenticatedGuard } from './authenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() request): any {
    return this.authService.loginJWT(request.user.id, request.user.username);
  }
  @UseGuards(JWTAuthGuard)
  @Get()
  testEnd() {
    return 'Test2';
  }
}
