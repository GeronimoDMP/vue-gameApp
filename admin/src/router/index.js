import Vue from 'vue'
// 引入路由器
import VueRouter from 'vue-router'
// 引入main路由组件
import main from '../views/main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'

import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'
// 登录组件
import Login from '../views/Login.vue'
// 应用路由器
Vue.use(VueRouter)

export default new VueRouter({
  // 登录页面
  routes: [
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path: '/',
      name: 'main',
      component: main,
      children: [
        // categories路由配置
        // 有/即绝对路由，没有即相对父路由的相对路由
        { path: '/categories/create', component: CategoryEdit },
        { path: '/categories/list', component: CategoryList },
        // 接收到list的编辑按钮传来的id，并传给CategoryEdit,编辑与新建共用页面
        { path: '/categories/edit/:id', component: CategoryEdit, props: true },

        // items路由配置
        { path: '/items/create', component: ItemEdit },
        { path: '/items/list', component: ItemList },
        { path: '/items/edit/:id', component: ItemEdit, props: true },

        // heroes路由配置
        { path: '/heroes/create', component: HeroEdit },
        { path: '/heroes/list', component: HeroList },
        { path: '/heroes/edit/:id', component: HeroEdit, props: true },

        // articles路由配置
        { path: '/articles/create', component: ArticleEdit },
        { path: '/articles/list', component: ArticleList },
        { path: '/articles/edit/:id', component: ArticleEdit, props: true },

        // ads路由配置
        { path: '/ads/create', component: AdEdit },
        { path: '/ads/list', component: AdList },
        { path: '/ads/edit/:id', component: AdEdit, props: true },

        // admin_users路由配置
        { path: '/admin_users/create', component: AdminUserEdit },
        { path: '/admin_users/list', component: AdminUserList },
        { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true }
      ]
    },
  ]
})


