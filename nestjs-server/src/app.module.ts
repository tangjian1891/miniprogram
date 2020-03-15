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
@Module({
  imports: [TypeOrmModule.forRoot(), PeriodicalModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}

  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '/periodical', method: RequestMethod.GET })
      .forRoutes(PeriodicalController);
  }
}
