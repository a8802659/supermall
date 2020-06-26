import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import toast from 'components/common/toast/index'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

// 创建一个Vue实例作为事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
// Vue.use会去调用参数的install
Vue.use(toast)

// 解决移动端的300ms延迟
FastClick.attach(document.body)

// 懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


