import {
  Injectable,
  HttpService,
  HttpException,
  NotFoundException,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { getRepository } from 'typeorm';
import { UserModule } from './user.module';
import { UserEntity } from './entity/user.entity';
import { generateToken } from 'src/core/util';
const util = require('util');
@Injectable()
export class UserService {
  constructor(private readonly httpService: HttpService) {}

  async wxLogin(js_code: string) {
    // 直接拿取token
    return await this.code2Session(js_code);
  }
  async code2Session(js_code) {
    const url = util.format(
      global['config'].wx.loginUrl,
      global['config'].wx.appId,
      global['config'].wx.appSecret,
      js_code,
    );
    console.log(url);
    const res = await this.httpService.get(url).toPromise();
    if (res.status !== 200) {
      // throw new global.errs.AuthFailed('openid获取失败');
      throw new BadRequestException('认证失败，请稍后重试');
    }
    let errCode = res.data.errcode;
    let errMsg = res.data.errmsg;
    if (errCode) {
      // throw new global.errs.AuthFailed('openid获取失败' + errMsg);
      throw new UnauthorizedException('openid获取失败' + errMsg);
    }
    // 确认微信用户，换取openid成功。进入登录流程
    if (res.data.openid) {
      // -1	系统繁忙，此时请开发者稍候再试
      // 0	请求成功
      // 40029	code 无效
      // 45011	频率限制，每个用户每分钟100次
      let user = await getRepository(UserEntity).findOne({
        openid: res.data.openid,
      });

      if (!user) {
        user = new UserEntity();
        user.openid = res.data.openid;
        user.nickname = '汤健啊';
        // user
        await getRepository(UserEntity).save(user);
      }
      return generateToken(user.id);
    }
  }
}
