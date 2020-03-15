import {
  NestMiddleware,
  NotFoundException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
const jwt = require('jsonwebtoken');
export class AuthMiddleware implements NestMiddleware {
  // 实现的这个use结果是不是很熟悉 app.use((req,res,next)=>{})
  use(req: any, res: any, next: Function) {
    let token = req.get('Authorization');
    if (token) {
      // 解析一下,放行
      try {
        let decode = jwt.verify(token, global['config'].token.secretKey);
        req.query['uid'] = decode.uid;
      } catch (error) {}
    } else {
      throw new UnauthorizedException('token过期,后续操作需要登录');
    }
    // 这里就直接被断言了，不会再走路由了。在中间件我们已经强制返回了。
    // 中间件就可以用来验证一手token
    // res.send('express的原生返回');
    next();
  }
}
