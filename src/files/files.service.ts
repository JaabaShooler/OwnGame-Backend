import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>,
  ) {}
  async create(file: Express.Multer.File, questionId: string) {
    return await this.repository.save({
      fileName: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      question: { id: questionId },
      deletedAt: null,
    });
  }

  findAllFilesForOneQuestion(questionId: string) {
    return this.repository.findBy({
      question: {
        id: questionId,
      },
    });
  }

  findOneFile(fileId: string) {
    return this.repository.findOneBy({
      id: fileId,
    });
  }

  removeOneFile(fileId: string) {
    return this.repository.delete({
      id: fileId,
    });
  }
}
