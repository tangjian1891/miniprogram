import {
  Http
} from '../../util/http.js'
Page({
  data: {
    fileList: [],
    face_list:{},
    access_token: null,
    activeNames: ['0'],//手风琴展示
    flag:false
  },

  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  afterRead(event) {
    if (!this.data.access_token) {
      wx.showToast({
        title: '体验次数已达上线，请稍后再试',
        icon: 'none',
        duration: 2000
      })
      return
    }
    console.log("触发上传", event)

    const {
      file
    } = event.detail;
    this.setData({
      fileList :[{
        url:file.path
      }]
    })
    let base64 = wx.getFileSystemManager().readFileSync(file.path, "base64")
    wx.request({
      url: `https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=${this.data.access_token}`,
    data:{
      image: base64,
      image_type: 'BASE64',
      face_type:"LIVE",
      // 返回的数据字段 年龄。美丑打分，脸型，性别 是否戴眼镜,口罩,卡通/真人
      face_field:'age,beauty,expression,gender,glasses,mask,face_type,emotion'
    },
    method:"POST",
      success: (res) => {
        console.log(res)
        if(res.data.error_code===0){
          this.setData({
            face_list:res.data.result.face_list[0],
            flag:true
          })
        }
      }
    })

  },
  onLoad() {
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=QswlGXSbAoMVrXkQ7m9kdQLp&client_secret=pS4LNXzjVqsoE4b1KOPZ8xQSnm2bkKDB',
      method: "POST",
      success: (res) => {
        this.setData({
          access_token: res.data.access_token
        })
      },
      fail() {
        wx.showToast({
          title: '体验次数已达上线，请稍后再试',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
});