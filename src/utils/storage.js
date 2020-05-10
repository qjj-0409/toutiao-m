/**
 * 封装本地存储方法模块
 */
// 获取用户相关信息（包括token）
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

// 添加本地存储
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

// 删除本地存储
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
