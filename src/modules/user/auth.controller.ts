import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginSocialRequest } from './requests/login-fb.request';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }
}
