import { Module } from '@nestjs/common';
import { PeriodicalService } from './periodical.service';
import { PeriodicalController } from './periodical.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MovieEntity,
  SentenceEntity,
  MusicEntity,
  PeriodicalEntity,
} from './entity/periodical.entity';
import { FavorEntity } from './entity/favor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovieEntity,
      SentenceEntity,
      MusicEntity,
      PeriodicalEntity,
      FavorEntity
    ]),
  ],
  providers: [PeriodicalService],
  controllers: [PeriodicalController],
})
export class PeriodicalModule { }
