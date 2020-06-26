import Toast from './Toast'

const obj = {}

// 利用Vue.use调用这个函数，默认会传入Vue作为参数
obj.install = function (Vue) {
  // 1.创建组件构造器
  const toastConstrutor = Vue.extend(Toast)
  // 2.new的方式，根据组件构造器可以创建出一个组件对象
  const toast = new toastConstrutor()
  // 3.将组件对象手动挂载到某个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj