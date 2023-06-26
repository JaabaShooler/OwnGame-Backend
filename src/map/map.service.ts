import { Injectable } from '@nestjs/common';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapEntity, VISIBILITY } from './entities/map.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class MapService {
  constructor(
    @InjectRepository(MapEntity)
    private repository: Repository<MapEntity>,
    private userService: UsersService,
  ) {}
  async create(dto: CreateMapDto, userId: string) {
    const user = await this.userService.findById(userId);
    return this.repository.save({
      ...dto,
      user: { id: userId },
      createdBy: user.userName,
    });
  }

  findAll() {
    return this.repository.findBy({
      visibility: VISIBILITY.PUBLIC,
    });
  }

  async findByCreator(userId: string) {
    return this.repository.findBy({
      user: {
        id: userId,
      },
    });
  }

  update(id: number, updateMapDto: UpdateMapDto) {
    return `This action updates a #${id} map`;
  }

  remove(id: number) {
    return `This action removes a #${id} map`;
  }
}
