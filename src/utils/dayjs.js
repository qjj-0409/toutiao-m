/**
 * 相对时间dayjs相关模块
 */
import Vue from 'vue'
// 1.引入dayjs插件
import dayjs from 'dayjs'
// 导入本地化语言
import 'dayjs/locale/zh-cn'

// 2.引入相对时间包
import relativeTime from 'dayjs/plugin/relativeTime'

// 3.配置处理使用相对时间
dayjs.extend(relativeTime)

// 4.配置使用中文语言包（全局使用）
dayjs.locale('zh-cn')

// 5.在main.js中加载使用dayjs.js模块
// 6.全局配置相对时间过滤器，方便其他组件使用
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})

// 时间格式化
Vue.filter('dateTime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
