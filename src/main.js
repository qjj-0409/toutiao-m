import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Vant组件库
import Vant from 'vant'
// 引入Vant组件库样式
import 'vant/lib/index.css'

// 引入lib-flexible插件的amfe-flexible模块，用于设置rem基准值
import 'amfe-flexible'

// 引入全局样式文件（最好放到最后，方便覆盖第三方样式）
import './styles/index.less'

// 全局注册Vant中的组件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
