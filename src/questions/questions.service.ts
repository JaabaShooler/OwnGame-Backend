import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Repository } from 'typeorm';
import { QuestionEntity } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly repository: Repository<QuestionEntity>,
  ) {}

  createQuestion(dto: CreateQuestionDto, mapId: string) {
    return this.repository.save({
      ...dto,
      map: {
        id: mapId,
      },
    });
  }

  findAllQuestionsForOneMap(mapId: string) {
    return this.repository.find({
      where: {
        map: {
          id: mapId,
        },
      },
      relations: {
        files: true,
      },
      order: {
        orderX: 'ASC',
        orderY: 'ASC',
      },
    });
  }

  findAllQuestionsByCategoryName(mapId: string, categoryName: string) {
    return this.repository.find({
      where: {
        categoryName,
        map: {
          id: mapId,
        },
      },
      relations: {
        files: true,
      },
      order: {
        cost: 'ASC',
      },
    });
  }

  findOneQuestion(questionId: string) {
    return this.repository.findOne({
      where: {
        id: questionId,
      },
    });
  }

  async updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto) {
    const property = await this.repository.findOne({
      where: { id },
    });
    return this.repository.save({ ...property, ...updateQuestionDto });
  }

  removeQuestion(id: string) {
    return this.repository.delete({ id: id });
  }
}
