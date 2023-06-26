import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapEntity } from './entities/map.entity';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [MapController],
  providers: [MapService],
  imports: [TypeOrmModule.forFeature([MapEntity]), UsersModule],
})
export class MapModule {}
