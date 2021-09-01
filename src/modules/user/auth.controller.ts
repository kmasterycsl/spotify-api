import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginSocialRequest } from './requests/login-fb.request';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Post('login-social')
  async loginBySocialProvider(@Body() body: LoginSocialRequest): Promise<string> {
    const user = new User();
    user.id = '1';
    user.name = 'khanhpro';
    const { access_token } = await this.authService.createTokenForUser(user);

    return access_token;
  }
}
