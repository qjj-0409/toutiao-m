import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式文件
import './styles/index.less'
// 引入字体图标库
import './styles/icon.less'

// 引入Vant组件库
import Vant from 'vant'
// 引入Vant组件库样式
import 'vant/lib/index.css'

// 引入lib-flexible插件的amfe-flexible模块，用于设置rem基准值
import 'amfe-flexible'

// 全局注册Vant中的组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
