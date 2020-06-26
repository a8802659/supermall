import {request} from './request'
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page){
  return request({
    url:'/api/n3/home/data',
    params:{
      type,
      page
    }
  })
}