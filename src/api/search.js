/**
 * 搜索相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取联想建议
 */
export const getSearchSuggestions = q => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 */
export const getSearchResults = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}

/**
 * 获取用户搜索历史
 */
export const getSearchHistories = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}

/**
 * 删除用户搜索历史
 */
export const deleteSearchHistories = () => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/search/histories'
  })
}
