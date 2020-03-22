import { Controller, Post, Body } from '@nestjs/common';
import { UserDto, UserLoginDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userServuce: UserService) { }
  @Post('register')
  register(@Body() userDto: UserDto) {
    // 暂时不做邮箱登录
  }
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    let token;
    switch (userLoginDto.type) {
      case 100:
        token = await this.userServuce.wxLogin(userLoginDto.js_code);
        break;
      case 200:
        break;
      default:
        break;
    }
    return {
      token,
    };
  }
}
