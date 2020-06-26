import axios from 'axios'

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000',
    timeout: 500000
  })

  // axios的拦截器  请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err)
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })
  // 发生网络请求
  return instance(config)
}

/*请求拦截会做什么
1.比如config中的服务器信息不符合服务器的要求，配置header等
2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标 show
3.默写网络请求(比如登录(toker))是必须携带一些特殊信息
*/

