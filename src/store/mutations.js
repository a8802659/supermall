import {
  ADD_TO_CART, 
  ADD_COUNTER
} from './mutation-type'
export default{
  // mutations唯一的目的就是修改state中的状态
  // mutations中的每一个方法尽可能完成的事情比较单一,这样才能跟踪count+1还是添加商品
  // 添加购物车商品
  [ADD_TO_CART](state,payload) {
    payload.count++
  },
  [ADD_COUNTER](state,payload) {
    state.cartList.push(payload)
  }
}