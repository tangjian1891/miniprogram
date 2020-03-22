import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpException,
} from '@nestjs/common';
import { PeriodicalService } from './periodical.service';

@Controller('periodical')
export class PeriodicalController {
  constructor(private readonly periodicalService: PeriodicalService) { }
  @Get()
  async findPeriodical() {
    const res = await this.periodicalService.findPeriodical();

    return res;
  }
  @Post('isFavor')
  async isFavorByUid(@Body() operFvor: any, @Query('uid') uid: number) {
    const art_id = operFvor.art_id;
    const type = parseInt(operFvor.type) || 0;
    const flag = await this.periodicalService.isFavorByUid(uid, art_id, type);
    return {
      flag,
    };
  }

  @Post('operFavor')
  async operFavor(@Body() operFvor: any, @Query('uid') uid: number) {
    //进行点赞或取消点赞操作  art_id, type, isLike
    const art_id = operFvor.art_id;
    const type = parseInt(operFvor.type) || 0;
    let msg;
    try {
      if (operFvor.isLike === 1) {
        // 点赞
        msg = await this.periodicalService.like(uid, art_id, type);
      } else {
        msg = await this.periodicalService.dislike(uid, art_id, type);
      }
    } catch (error) {
      console.log(error);
      return new HttpException('压力过大，请稍后再试', 503);
    }
    return {
      msg,
      isLike: operFvor.isLike,
    };
  }
}
