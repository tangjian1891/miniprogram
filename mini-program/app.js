// import {
//   UserModel
// } from './model/userModel.js'
// const userModel = new UserModel()
// App({
//   onLaunch() {
//     console.log('先走app.js启动项')
//     wx.getSetting({
//       success: (data) => {
//         console.log('看看用户有没有授权')
//         if (data.authSetting['scope.userInfo']) {
//           console.log("用户已经授权过，授权的情况下。可以直接直接wx.getUserInfo拿,存在缓存中")
//           wx.getUserInfo({
//             success: (data) => {
//               console.log('看看在授权的情况下.wx.getUserInfo可以直接拿userInfo');
//               console.log('存一下用户基本信息')
//               wx.setStorageSync('avatarUrl', data.userInfo.avatarUrl)
//               wx.setStorageSync('nickName', data.userInfo.nickName)
//               wx.setStorageSync('isAuth','1')
//               this.login()

//             }
//           })

//           let token = wx.getStorageSync('token')
//           // 已经授权,可以直接拿userInfo 存本地
//           console.log('检测是否有token?')

//         } else {
//           console.log('用户没有授权，清空所有数据吧')
//           wx.clearStorage('token')
//           wx.clearStorageSync('avatarUrl')
//           wx.clearStorageSync('nickName')
//           wx.clearStorageSync('isAuth')
//           console.log('清空了所有storage缓存信息')
//         }
//       }
//     })
//   },
//   // 在已经授权的情况下，静默登录。比如说。token失效了。那就重新获取
//   login() {
//     wx.login({
//       success: async(data) => {
//         let res = await userModel.login({
//           js_code: data.code,
//           type: 100
//         })
//         console.log(res)
//         if (res.data.token) {
//           wx.setStorageSync('token', res.data.token)
//         }
//         console.log("静默登录成功")
//       }
//     })
//   }
// })