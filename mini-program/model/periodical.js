import {Http} from '../util/http.js'


class PeriodicalModel extends Http{
  constructor(){
    super()
  }

  // 获取最近的所有期刊
  getLatest(){
   return  this.request({
      url:"/periodical",
    }) 
  }
  // 获取指定期刊的点赞情况
  getIsLike({ art_id, type }){
   return this.request({
      url:'/periodical/isFavor',
      method:"POST",
     data: { art_id, type }
    })
  }
  // 点赞 取消 期刊
  operFavor({
    art_id, type, isLike
  }){
  return  this.request({
    url:'/periodical/operFavor',
      method:"POST",
      data:{
        art_id, type, isLike
      }
    })
  }
}
export { PeriodicalModel}