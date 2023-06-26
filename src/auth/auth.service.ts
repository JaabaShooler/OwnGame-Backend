import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as process from 'process';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email, password) {
    const user = await this.usersService.findByEmail(email.toLowerCase());
    const validPassword = await bcrypt.compare(password, user?.password);
    if (!user || !validPassword) {
      throw new UnauthorizedException('Incorrect email or password!');
    }
    return {
      email: user.email,
      username: user.userName,
      id: user.id,
    };
  }

  async register(dto: CreateUserDto) {
    const { password, email, ...rest } = dto;
    const getUser = await this.usersService.findByEmail(email.toLowerCase());
    console.log(getUser);
    if (getUser) {
      throw new HttpException('This user is exist', HttpStatus.BAD_REQUEST);
    }
    const newPassword = await bcrypt.hash(password, 8);
    const newUser = {
      ...rest,
      email: email.toLowerCase(),
      password: newPassword,
    };
    const user = await this.usersService.create(newUser);
    const payload = { id: user.id };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(user: Omit<UserEntity, 'fullName'>) {
    const getUser = await this.usersService.findByEmail(
      user.email.toLowerCase(),
    );
    if (!user) {
      throw new NotFoundException();
    }
    const payload = { id: getUser.id };
    return {
      token: this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY,
      }),
    };
  }
}
