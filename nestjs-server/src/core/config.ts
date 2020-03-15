export const config = {
  wx: {
    appId: 'wx358f03b2b47dbd07',
    appSecret: 'd241e02ef18852f65e6b4588f26f8932',
    loginUrl:
      'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
  },
  token: {
    secretKey: 'wdnmd', //
    expiresIn: 60 * 60,
  },
};
