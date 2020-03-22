import {
  Http
} from '../util/http.js'
export class UserModel extends Http {
  login(data) {
    return this.request({
      url: "/user/login",
      method: "POST",
      data
    })
  }
}