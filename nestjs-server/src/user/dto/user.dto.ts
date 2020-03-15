// 正常的邮箱登录
export class UserDto {
  email: string;
  password: string;
  repeat_password: string;
}

export class UserLoginDto extends UserDto {
  js_code: string;
  type: number;
}
