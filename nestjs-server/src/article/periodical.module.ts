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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MovieEntity,
      SentenceEntity,
      MusicEntity,
      PeriodicalEntity,
    ]),
  ],
  providers: [PeriodicalService],
  controllers: [PeriodicalController],
})
export class PeriodicalModule {}
