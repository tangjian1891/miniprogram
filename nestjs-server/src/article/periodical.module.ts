import { Module } from '@nestjs/common';
import { PeriodicalService } from './periodical.service';
import { PeriodicalController } from './periodical.controller';

@Module({
  imports: [],
  providers: [PeriodicalService],
  controllers: [PeriodicalController],
})
export class PeriodicalModule {}
