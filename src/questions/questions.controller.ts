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
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/auth.jwt.guard';

@ApiTags('questions')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post('/new/:mapId')
  create(@Body() dto: CreateQuestionDto, @Param('mapId') mapId: string) {
    return this.questionsService.createQuestion(dto, mapId);
  }

  @Get('/all/:mapId')
  findAll(@Param('mapId') mapId: string) {
    return this.questionsService.findAllQuestionsForOneMap(mapId);
  }

  @Get('/:category/:mapId')
  findAllByCategory(
    @Param('category') category: string,
    @Param('mapId') mapId: string,
  ) {
    return this.questionsService.findAllQuestionsByCategoryName(
      mapId,
      category,
    );
  }

  @Get('one/:questionId')
  findOne(@Param('questionId') id: string) {
    return this.questionsService.findOneQuestion(id);
  }

  @Patch(':questionId')
  update(
    @Param('questionId') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.updateQuestion(id, updateQuestionDto);
  }

  @Delete(':questionId')
  removeQuestion(@Param('questionId') id: string) {
    return this.questionsService.removeQuestion(id);
  }
}
