import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodicalModule } from './article/periodical.module';
import { Connection } from 'typeorm';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './app.middleware';
import { PeriodicalController } from './article/periodical.controller';
import {
  MovieEntity,
  SentenceEntity,
  MusicEntity,
  PeriodicalEntity,
} from './article/entity/periodical.entity';
import { UserEntity } from './user/entity/user.entity';
import { FavorEntity } from './article/entity/favor.entity';
@Module({
  imports: [
    PeriodicalModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '106.54.139.232',
      port: 3306,
      username: 'root',
      password: '654321',
      database: 'summer_is_coming',
      entities: [
        MovieEntity,
        SentenceEntity,
        MusicEntity,
        PeriodicalEntity,
        UserEntity,
        FavorEntity
      ],
      logging: false,
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) { }

  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/periodical', method: RequestMethod.GET })
      .forRoutes(PeriodicalController);
  }
}
