import { Injectable, HttpException } from '@nestjs/common';
import { getRepository } from 'typeorm';
import {
  PeriodicalEntity,
  MovieEntity,
  SentenceEntity,
  MusicEntity,
} from './entity/periodical.entity';
import { FavorEntity } from './entity/favor.entity';

@Injectable()
export class PeriodicalService {
  async findPeriodical() {
    const Periodicals = await getRepository(PeriodicalEntity).find();

    let periodicalObj = {
      100: [],
      200: [],
      300: [],
    };
    Periodicals.forEach(periodical => {
      // 巧妙分类
      periodicalObj[periodical.type].push(periodical.per_id);
    });
    // 使用in查询。三次查出所有
    let keys = Object.keys(periodicalObj);
    let resList = [];

    for (let i = 0; i < keys.length; i++) {
      if (periodicalObj[keys[i]].length > 0) {
        let list = await this.getListByType(keys[i], periodicalObj[keys[i]]);
        let newList = list.map(item => {
          item['type'] = keys[i];
          return item;
        });
        resList.push(...newList);
      }
    }
    return resList;
  }

  async getListByType(type, ids) {
    switch (parseInt(type)) {
      case 100:
        return await getRepository(MovieEntity).findByIds(ids);
        break;
      case 200:
        return await getRepository(MusicEntity).findByIds(ids);
        break;
      case 300:
        return await getRepository(SentenceEntity).findByIds(ids);
        break;
      default:
        break;
    }
    return [];
  }

  // 用户是否对指定article点赞'
  async isFavorByUid(uid: number, art_id: number, type: number) {
    try {
      let favor = await getRepository(FavorEntity).findOne({
        uid,
        art_id,
        type,
      });
      console.log(favor);
      if (!favor) {
        return false;
      }
    } catch (error) {
      return false;
    }
    return true;
  }

  // 点赞
  async like(uid: number, art_id: number, type: number) {
    let favor = new FavorEntity();
    favor.uid = uid;
    favor.art_id = art_id;
    favor.type = type;
    await getRepository(FavorEntity).save(favor);
    // 同时还操作指定article的点赞数量。+1
    this.operArticleFavor(art_id, type, true);
    return '点赞成功';
  }

  // 取消点赞
  async dislike(uid: number, art_id: number, type: number) {
    let favor = new FavorEntity();
    favor.uid = uid;
    favor.art_id = art_id;
    favor.type = type;
    await getRepository(FavorEntity).delete(favor);
    // 点赞数量-1
    this.operArticleFavor(art_id, type, false);
    return '取消点赞';
  }
  // 操作点赞数量增加/减少
  async operArticleFavor(art_id: number, type: number, flag: boolean) {
    console.log(type);
    console.log(typeof type);
    let count;
    if (flag) {
      count = 1;
    } else {
      count = -1;
    }
    switch (type) {
      case 100:
        await getRepository(MovieEntity).increment(
          { id: art_id },
          'fav_nums',
          count,
        );
        break;
      case 200:
        await getRepository(MusicEntity).increment(
          { id: art_id },
          'fav_nums',
          count,
        );
        break;
      case 300:
        await getRepository(SentenceEntity).increment(
          { id: art_id },
          'fav_nums',
          count,
        );
        break;
      default:
        throw new Error('错误的点赞参数');
        break;
    }
  }
}
