import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/auth.jwt.guard';

@ApiTags('files')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('/:questionId')
  @UseInterceptors(FileInterceptor('file', { storage: fileStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async create(
    @UploadedFile()
    file: Express.Multer.File,
    @Param('questionId') questionId: string,
  ) {
    return await this.filesService.create(file, questionId);
  }

  @Get('/all/:questionId')
  findAll(@Param('questionId') questionId: string) {
    return this.filesService.findAllFilesForOneQuestion(questionId);
  }

  @Get(':fileId')
  findOne(@Param('fileId') id: string) {
    return this.filesService.findOneFile(id);
  }

  @Delete(':fileId')
  remove(@Param('fileId') id: string) {
    return this.filesService.removeOneFile(id);
  }
}
