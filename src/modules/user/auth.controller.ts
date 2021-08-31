import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './strategies/jwt.guard';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Get('login-social/:providerId')
  async loginBySocialProvider(): Promise<string> {
    const user = new User();
    user.id = '1';
    user.name = 'khanhpro';
    const { access_token } = await this.authService.createTokenForUser(user);

    return access_token;
  }
}
