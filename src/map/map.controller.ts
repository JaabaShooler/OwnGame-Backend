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
    return await this.mapService.create(dto, userId);
  }

  @Get('/all')
  findAll() {
    return this.mapService.findAll();
  }

  @Get('/my')
  findOne(@UserId() userId: string) {
    return this.mapService.findByCreator(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMapDto: UpdateMapDto) {
    return this.mapService.update(+id, updateMapDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mapService.remove(+id);
  }
}
