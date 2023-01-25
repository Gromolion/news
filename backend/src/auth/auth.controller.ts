import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import RegisterUserDto from './dto/register-user.dto';
import { LoginGuard } from './guard/login.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LoginGuard)
  login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    await this.authService.registerUser(registerUserDto);
  }
}
