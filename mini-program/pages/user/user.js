import {
  UserModel
} from '../../model/user.model.js'
const userModel = new UserModel()
Page({
  onLoad() {},
  data: {
    hasUserInfo: false,
    userInfo: null
  },
  // 获取什么信息啊。直接拉起登录即可
  getUserInfo(event) {
    let userInfo = event.detail.userInfo
    if (userInfo) {
      // 授权成功 。准备登录。第一次这这里
      this.login(userInfo)
    }
  },
  // 微信登录
  login(userInfo) {
    wx.login({
      success: (res) => {
        if (res.code) {
          userModel.login({
            js_code: res.code,
            type: 100
          }).then(res => {
            console.log(res)
            if (res.data.token) {
              wx.setStorageSync('token', res.data.token)
            }
            this.setData({
              hasUserInfo: true,
              userInfo
            })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  // 判断用户是否已经授权
  onLoad() {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          console.log("用户已经授权过,检测是否有token，没有就静默登录换token")
          let token = wx.getStorageSync('token')
          // 已经授权,可以直接拿userInfo
          wx.getUserInfo({
            success: (data) => {
              // token存在。可以直接拿用户的头像，昵称.证明已经登录
              if (token) {
                this.setData({
                  hasUserInfo: true,
                  userInfo: data.userInfo
                })
              } else {
                this.login(data.userInfo)
              }
            }
          })

        } else {
          console.log('用户没有过')
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },
  switchAI(){
    wx.navigateTo({
      url: '../ai/ai',
    })
  }
})