// components/classic/music/index.js
import {
  classicBeh
} from '../classic-beh.js'
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    playing: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
  
    waittingUrl: 'images/player@waitting.png',
    playingUrl: 'images/player@playing.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      this.triggerEvent('startMusic')

    }
  },
 
})