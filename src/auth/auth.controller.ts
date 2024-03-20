import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from 'src/users/dto/signin-dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() dto: SigninDto) {
    return this.authService.signIn(dto);
  }
  @Post('register')
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }
}
