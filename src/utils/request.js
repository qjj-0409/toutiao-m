/**
 * 封装axios请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'

// 在非组件模块中获取store必须通过import导入
import store from '@/store/'
import { removeItem } from './storage'
import router from '@/router'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // baseURL: 'http://api-toutiao-web.itheima.net',
  // 定义后端返回的原始数据的处理
  // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    // console.log(data)

    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      // console.log('转换失败', err)
      // 如果转换失败了，则进入这里
      // 我们在这里把数据原封不动的直接返回给请求使用
      return data
    }

    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]
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

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 对响应错误做点什么
  const { status } = error.response
  if (status === 401) {
    // 用户认证失败
    // 判断是否有user或者user.token
    const { user } = store.state
    // 没有，直接去登录
    if (!user || !user.token) {
      return redirectLogin()
    }
    // 有，则使用refresh_token请求获取新的token
    try {
      const { data } = await request({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 拿到新的token之后，把它更新到容器中
      user.token = data.data.token
      store.commit('setUser', user)
      return request(error.config)
    } catch (error) {
      Toast.fail('用户认证失败')
      // 1.清除本地存储中得用户登录状态
      removeItem('user')
      // 2.跳转到登录页面
      redirectLogin()
    }
  } else if (status === 400) {
    Toast.fail('请求参数错误，请检查请求参数')
  } else if (status === 507) {
    Toast.fail('数据库错误，联系后端人员')
  } else if (status === 403) {
    Toast.fail('没有权限操作')
  }
  return Promise.reject(error)
})

// 封装一个函数重定向到登录页面
function redirectLogin () {
  router.push('/login')
}

export default request
