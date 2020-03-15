const jwt = require('jsonwebtoken');
/**
 * 生成token
 * @param user_id  用户的id
 */
export const generateToken = function(user_id) {
  const secretKey = global['config'].token.secretKey;
  const expiresIn = global['config'].token.expiresIn;
  // 签发的token需要的 payload  security  config(过期时间)
  return jwt.sign(
    {
      uid: user_id,
      message: '你TM瞅啥呢，解我token是不是，你个铁憨憨',
    },
    secretKey,
    {
      expiresIn,
    },
  );
};
