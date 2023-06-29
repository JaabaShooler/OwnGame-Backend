import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MapService } from './map.service';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';
import { JwtGuard } from '../auth/auth.jwt.guard';
import { UserId } from '../decorators/user-id.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('maps')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Post()
  async create(@Body() dto: CreateMapDto, @UserId() userId: string) {
    return await this.mapService.createMap(dto, userId);
  }

  @Get('/all')
  findAllPublicMaps() {
    return this.mapService.findAllMaps();
  }

  @Get('/my')
  findMapsByCreator(@UserId() userId: string) {
    return this.mapService.findMapByCreator(userId);
  }

  @Patch(':id')
  updateMap(@Param('id') id: string, @Body() updateMapDto: UpdateMapDto) {
    return this.mapService.updateMap(id, updateMapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mapService.removeMap(id);
  }
}
