import {
  PeriodicalModel
} from '../../model/periodical.js'
let periodicalModel = new PeriodicalModel()
// 音乐管理
const mMgr = wx.getBackgroundAudioManager()
Page({
  onShow: function () {
   if(!this.data.isFirstLoad){
     this.getIsLike()
   }
  },

  /**
   * 页面的初始数据
   */
  data: {
    isLike: false, // 是否喜欢/点赞
    classic: null, //文章数据
    classicData: null, //文章数据集合
    latest: true, //是否为最后一期
    first: false, //是否为最后一期
    count: 0, //总共几期
    refreshCount: 1, //刷新刷新次数
    forbidTime: null, //静止刷新时间
    total: 1, //总数
    currentIndex: 0, //第一页的索引是0
    playing: false, //默认关闭音乐
    nowArticle: 1, //当前文章
    months: [
      '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月',
      '十二月'
    ],
    nowMonth:"",//当前的月份
    isFirstLoad:true
  },
  // 开始音乐
  startMusic() {
    console.log('播放音乐吧')
    // 暂停
    if (this.data.playing) {
      this.setData({
        playing: false
      })
      mMgr.pause()
    } else {
      // 开启
      this.setData({
        playing: true
      })
      console.log(this.data.classic.url)
      mMgr.title = this.data.classic.title
      mMgr.src = this.data.classic.url
    }
  },
  _resetMusicStatus() {
    // 目的。检测当前的 classic是否为音乐.
    // 音乐。判断是否为当前音乐的classic。是 图标播放，不是 图标暂停。
    if (this.data.classic.type === '200') {
      console.log("是音乐类型")
      if (mMgr.src !== this.data.classic.url) {
        this.setData({
          playing: false
        })
      } else {
        if (mMgr.paused) {
          this.setData({
            playing: false
          })
          return
        }
        this.setData({
          playing: true
        })
      }
    }
  },
  right() {
    // 向右切换。切换数据。当前索引+1
    this.setData({
      currentIndex: this.data.currentIndex + 1,
      classic: this.data.classicData[this.data.currentIndex + 1],
    })
    this.getIsLike()
    this.setData({
      nowArticle: this.data.nowArticle - 1
    })
    // 重新计算光标切换
    this.calcIsToggle()
    this._resetMusicStatus()
  },
  left() {
    // 向左切换。切换数据。当前索引-1
    this.setData({
      currentIndex: this.data.currentIndex - 1,
      classic: this.data.classicData[this.data.currentIndex - 1],
    })
    // 查看用户是否点赞
    this.getIsLike()
    this.setData({
      nowArticle: this.data.nowArticle + 1
    })
    // 重新计算光标切换
    this.calcIsToggle()
    this._resetMusicStatus()
  },


  calcIsToggle() {
    let currentIndex = this.data.currentIndex
    let total = this.data.total
    let latest = currentIndex + 1 < total ? true : false
    let first = currentIndex === 0 ? false : true
    this.setData({
      first,
      latest
    })
  },
  onLoad() {
    periodicalModel.getLatest().then((res) => {
      this.setData({
        classicData: res.data,
        classic: res.data[this.data.currentIndex],
        total: res.data.length,
        nowArticle: res.data.length,
        isFirstLoad:false
      })
      this.getIsLike()
 
    })
    // 计算当前月份
    
    let index = new Date().getMonth()
    this.setData({
      nowMonth: this.data.months[index]
    })
  },

  // 获取是否点赞
  getIsLike() {
    // 判断是否有token。登录后才执行
    let token = wx.getStorageSync('token')
    if (token) {
      let type = this.data.classic.type
      let art_id = this.data.classic.id
      periodicalModel.getIsLike({
        art_id,
        type
      }).then(res => {
        this.setData({
          isLike: res.data.flag
        })
      })
    }
  },
  // 操作是 点赞还是取消点赞
  operFavor() {
    // 发送请求
    let art_id = this.data.classic.id
    let type = this.data.classic.type
    let isLike = this.data.isLike ? 0 : 1
    periodicalModel.operFavor({
      art_id,
      type,
      isLike
    }).then(res => {
      console.log(res)
      if (res.statusCode!==201){
        wx.showToast({
          title: '请去用户中心先登录',
          icon:'none'
        })
        return
      }
      if (res.data.isLike === 1) {
        this.setData({
          isLike: true,
          ['classic.fav_nums']: this.data.classic.fav_nums + 1
        })
      } else {
        this.setData({
          isLike: false,
          ['classic.fav_nums']: this.data.classic.fav_nums - 1
        })
      }
    })
  },
  onPullDownRefresh() {
    this.setData({
      refreshCount: this.data.refreshCount + 1
    })
    wx.stopPullDownRefresh({
      success: () => {
        let time = this.data.forbidTime
        console.log((new Date().getTime()) - time)
        if (time && ((new Date().getTime()) - time) > 30 * 1000) {

          console.log("进入")
          this.setData({
            refreshCount: 1
          })
        }
        if (this.data.refreshCount < 3) {
          wx.showToast({
            title: '刷新成功',
          })
        } else {
          this.setData({
            forbidTime: new Date().getTime()
          })
          wx.showToast({
            title: '频率过快，恶意请求，已记录请求行为, 30S后放行',
            icon: 'none',
            duration: 2500
          })
        }

      }
    })

  }
})