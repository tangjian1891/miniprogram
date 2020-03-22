import {
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
const jwt = require('jsonwebtoken');
export class AuthMiddleware implements NestMiddleware {
  // 实现的这个use结果是不是很熟悉 app.use((req,res,next)=>{})
  use(req: any, res: any, next: Function) {
    const token = req.get('Authorization');
    console.log("起手拿一下", token)
    if (token) {
      // 解析一下,放行
      try {
        const decode = jwt.verify(token, global['config'].token.secretKey);
        req.query['uid'] = decode.uid;
        next();
      } catch (error) {
        throw new UnauthorizedException('token过期,后续操作需要登录');
      }
    } else {
      throw new UnauthorizedException('token过期,后续操作需要登录');
    }
    // 这里就直接被断言了，不会再走路由了。在中间件我们已经强制返回了。
    // 中间件就可以用来验证一手token
    // res.send('express的原生返回');

  }
}
