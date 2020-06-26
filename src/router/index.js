import Vue from 'vue'
import VueRouter from 'vue-router'

// 4.懒加载   配置懒加载之前肯定要有相应的组件
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

// 1.按装router
Vue.use(VueRouter)

// 3.路由表  懒加载之后就可以填内容
const routes = [
  {
    path: "",
    redirect: '/home'
  },
  {
    path: "/home",
    component: Home
  },
  {
    path: "/category",
    component: Category
  },
  {
    path: "/cart",
    component: Cart
  },
  {
    path: "/profile",
    component: Profile
  },
  {
    path: "/detail/:iid",
    component: Detail
  },
]

// 2.创建路由对象
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router