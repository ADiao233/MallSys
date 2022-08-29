import {request } from './request'
//获取轮播图和首页推荐数据
export function getHomeMultidata(){
  return request({
    url:"/home/multidata"
  })
}
//获取主页商品列表和分页数据
export function getHomeGoods(type,page){
  return request({
    url:"/home/data",
    params:{
      type,
      page,
    }
  })
}