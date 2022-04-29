import Vue from 'vue'
import App from './App.vue'

// 引入插件
import './plugins/element.js'
// 引入路由器
import router from './router'
// 引入axios
import http from './http'
// Vue原型添加http方法，所有组件可this.$http发请求
Vue.prototype.$http=http

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
