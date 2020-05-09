/**
 * 封装axios请求模块
 */
import axios from 'axios'

const requst = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

export default requst
