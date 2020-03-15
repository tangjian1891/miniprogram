import {
  config
} from "../config.js"

class Http {
  request(  { url, method="GET",data,header}) {
    // let header = Object.assign({
    //   'content-type': 'application/json',
    // })
    return new Promise((resolve,reject)=>{
      let Authorization=  wx.getStorageSync('token') ||''
      wx.request({
        url: config.BASE_URL + url,
        method: method || 'GET',
        data: data,
        header: Object.assign({
          'content-type': 'application/json',
          Authorization
        },header),
        success: (res) => {
          let code = res.statusCode.toString()
          if (code.startsWith('5')) {
            wx.showToast({
              title: '错误',
              icon: 'none',
              duration: 2000
            })
          } else if (code===401){
              // 权限不足。。直接静默登录
              console.log("未授权")
          }
          
           else  {
            resolve(res)
          }
        },
        fail: (error) => {
          reject(error)
        }
      })
    })

  }
}

export {
  Http
}