import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { responseCreator } from '../helpers/responseCreator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: CreateUserDto })
  async login(@Body() user: Omit<UserEntity, 'fullName'>) {
    const { email, password } = user;
    const validatedUser = await this.authService.validateUser(email, password);
    if (!validatedUser) {
      return new UnauthorizedException('Wrong email or password');
    }
    return responseCreator(await this.authService.login(user));
  }
  @Post('/signup')
  @ApiBody({ type: CreateUserDto })
  async signup(@Body() dto: CreateUserDto) {
    return responseCreator(await this.authService.register(dto));
  }
}
