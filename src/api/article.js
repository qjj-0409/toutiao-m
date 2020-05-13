/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表数据
 */
export const getArticles = params => {
  return request({
    type: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
