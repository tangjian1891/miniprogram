// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    first:Boolean,
    latest: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    highLeftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    hihtRightSrc: 'images/triangle@right.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft(){
      if(!this.data.first){
          return
      }
      // 向左切换
      this.triggerEvent('left')
    },
    onRight(){
      if (!this.data.latest) {
        return
      }
      // 向右切换
    this.triggerEvent('right')
    }
  }
})
