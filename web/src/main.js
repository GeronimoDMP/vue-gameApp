import Vue from 'vue'
import App from './App.vue'

import './aa.scss'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)
// fonticon
import './assets/fonticon/iconfont.css'
// 轮播图
import VueAwesomeSeiper from'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSeiper)
// axios
import axios from 'axios'
Vue.prototype.$http=axios.create({
  baseURL:'http://localhost:3000/web/api'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
