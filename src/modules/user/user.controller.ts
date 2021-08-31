import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './strategies/jwt.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}

