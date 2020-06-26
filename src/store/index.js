import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

// 1.创建store对象   store:储存、仓库
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
// 3.挂载Vue实例上
export default store