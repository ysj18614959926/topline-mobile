import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css' // 引入vant样式
import 'amfe-flexible' // 引入amfe-flexible设置 rem 基准值
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
import relativeTime from '@/filters/time'
Vue.use(VeeValidate)
Vue.config.productionTip = false
Vue.use(Vant)
Vue.filter('relativeTime', relativeTime)
Validator.localize('zh_CN', zhCN)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
