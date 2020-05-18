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

/**
 * 根据id获取指定文章详情
 */
export const getArticleById = articleId => {
  return request({
    type: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
