import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * 文章Article 下面的 movie music  sentence 才是Article的实际组成部分
 */
// 另外可以提取 movie music  sentence  公共的部分
class BaseArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  title: string;
  @Column()
  content: string;
  @Column()
  image: string;
  @Column({ type: 'int', width: 11 })
  fav_nums: number;
}
@Entity('movie')
class MovieEntity extends BaseArticleEntity {}
@Entity('sentence')
class SentenceEntity extends BaseArticleEntity {}
@Entity('music')
class MusicEntity extends BaseArticleEntity {
  constructor() {
    super();
  }
  @Column()
  url: string;
}
@Entity('periodical')
class PeriodicalEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ comment: '关联查找指定的期刊' })
  per_id: number;
  @Column({ comment: '100电影、200音乐、300句子' })
  type: number;
  @CreateDateColumn()
  pubdate;
}

export { MovieEntity, SentenceEntity, MusicEntity, PeriodicalEntity };
