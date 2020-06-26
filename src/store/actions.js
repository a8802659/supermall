import {
  ADD_TO_CART,
  ADD_COUNTER
} from './mutation-type'

export default {
  addCart(context, payload) {
    // 将添加商品的事件传递到外面，进行then后续操作
    return new Promise((resolve, reject) => {
      // 3.方式三  find
      // 3.1查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 3.2判断oldoldProduct,之前是否有该商品
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_TO_CART, oldProduct)
        resolve('当前商品加1')
      } else {
        payload.count = 1
        payload.checked = true
        context.commit(ADD_COUNTER, payload)
        resolve('添加了新商品')
      }
    })
    // 1.方式一 for循环
    // let oldProduct = null
    // for (let item of state.cartList){
    //   if(item.iid === payload.iid){
    //     oldProduct = item
    //   }
    // }
    // if(oldProduct){
    //   oldProduct.count +=1
    // }else{
    //   payload.count =1
    //   state.cartList.push(payload)
    // }

    // 2.方式二  indexOf
    // let index =state.cartList.indexOf(payload)
    // if(index !== -1){
    //   let oldProduct =state.cartList[index]
    //   oldProduct.count +=1
    // }else{
    //   payload.count =1
    //   state.cartList.push(payload)
    // }


  }
}