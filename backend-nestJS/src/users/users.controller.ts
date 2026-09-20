import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { RecoverPasswordDto } from './dto/recover-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usersService.validateUser(loginDto);
    return {
      success: true,
      user,
    };
  }

  @Post('recover-password')
  @HttpCode(HttpStatus.OK)
  async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
    return this.usersService.recoverPassword(recoverPasswordDto);
  }
}
