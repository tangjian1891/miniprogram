import {
  UserModel
} from '../../model/userModel.js'
const userModel = new UserModel()
Page({
  onLoad() {},
  data: {
    isWXAuth: false,//用户是否授权微信
    userInfo: null,//用户的信息
    showPopup: false,//弹窗
    hasToken: false //用户是否登录
  },
  // 判断用户是否已经授权
  onLoad() {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          console.log("用户已经授权过,检测是否有token")
          // 已经授权,可以直接拿userInfo
          wx.getUserInfo({
            success: (data) => {
              let token = wx.getStorageSync('token')
              // token存在。可以直接拿用户的头像，昵称.证明已经登录
              if (token) {
                this.setData({
                  isWXAuth: true,
                  userInfo: data.userInfo,
                  hasToken: true
                })
                wx.setStorageSync('userInfo', data.userInfo)
                // 存入内存
              } else {
                //因为二次切换不会执行onload 。所以hasToken不会再这里被更改。预防性写法
                this.setData({
                  isWXAuth: true,
                  userInfo: data.userInfo,
                  hasToken: false
                })
              }
            }
          })
        } else {
          console.log('用户没有授权')
          this.setData({
            isWXAuth: false,//用户是否授权微信
            userInfo: null,//用户的信息
            showPopup: false,//弹窗
            hasToken: false 
          })
          // 清除token
          wx.clearStorageSync('token')
        }
      }
    })
  },

  
  // 获取用户授权。可以取得基本信息.
  getUserInfo(event) {
    console.log(event)
    // 用户已授权状态
    let userInfo = event.detail.userInfo
    if (userInfo) {
      // 授权成功 。准备登录。第一次这这里
      this.setData({
        userInfo,
        isWXAuth: true,
        showPopup: false
      })

    } else {
      console.log('用户取消了授权')
    }
  },
  // 微信登录
  login(userInfo) {
    // 查看是否授权
    if (!this.data.isWXAuth) {
      this.setData({
        showPopup: true
      })
      return
    }
    // 开始登录
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
              hasToken: true
            })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

 
  switchAI() {
    wx.navigateTo({
      url: '../ai/ai',
    })
  },
  // 关闭模态框
  closePopup() {
    this.setData({
      showPopup: false
    })
  },
  onShow() {
    console.log("执行了show方法")
    let token = wx.getStorageSync('token')
    if (token) {
      return
    } else {
      this.setData({
        showPopup: false,
        hasToken: false
      })
    }
  }
})