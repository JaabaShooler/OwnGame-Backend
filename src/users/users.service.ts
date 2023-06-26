import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return this.repository.findOneBy({
      email,
    });
  }

  async findById(id: string, withPassword = true) {
    const { password, ...rest } = await this.repository.findOneBy({
      id,
    });
    if (withPassword) {
      return { password: password, ...rest };
    }
    return { ...rest };
  }

  create(dto: CreateUserDto) {
    return this.repository.save(dto);
  }
}
