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
  async createMap(dto: CreateMapDto, userId: string) {
    const user = await this.userService.findById(userId);
    return this.repository.save({
      ...dto,
      user: { id: userId },
      createdBy: user.userName,
    });
  }

  findAllMaps() {
    return this.repository.find({
      where: {
        visibility: VISIBILITY.PUBLIC,
      },
      relations: {
        questions: {
          files: true,
        },
      },
    });
  }

  async findMapByCreator(userId: string) {
    return this.repository.findBy({
      user: {
        id: userId,
      },
    });
  }

  async updateMap(id: string, updateMapDto: UpdateMapDto) {
    const property = await this.repository.findOne({
      where: { id },
    });
    return this.repository.save({ ...property, ...updateMapDto });
  }

  removeMap(id: string) {
    return this.repository.delete({ id: id });
  }
}
