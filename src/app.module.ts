import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MapModule } from './map/map.module';
import { RoomsModule } from './rooms/rooms.module';
import { QuestionsModule } from './questions/questions.module';
import { UserEntity } from './users/entities/user.entity';
import { MapEntity } from './map/entities/map.entity';
import { QuestionEntity } from './questions/entities/question.entity';
import { FilesModule } from './files/files.module';
import { FileEntity } from './files/entities/file.entity';
import { TeamModule } from './team/team.module';
import { RoomEntity } from './rooms/entities/room.entity';
import { TeamEntity } from './team/entities/team.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        UserEntity,
        MapEntity,
        QuestionEntity,
        FileEntity,
        RoomEntity,
        TeamEntity,
      ],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    MapModule,
    RoomsModule,
    QuestionsModule,
    FilesModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
