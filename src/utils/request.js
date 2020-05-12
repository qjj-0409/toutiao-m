/**
 * 封装axios请求模块
 */
import axios from 'axios'

// 在非组件模块中获取store必须通过import导入
import store from '@/store/'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state

  // 如果用户已登录，统一给接口设置token信息
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 处理完之后一定要把config返回，否则请求就会停在这里
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default request
