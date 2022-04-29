import VueRouter from 'vue-router'

import MainPage from '../views/MainPage.vue'
import HomePage from '../views/HomePage.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'


export default new VueRouter({
  // routes！！路由们
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage,
      children: [
        { path: '/', name: 'home', component: HomePage },
        { path: '/articles/:id', name: 'article', component: Article, props: true },
      ]
    },
    { 
      path: '/heroes/:id',
     name: 'hero', 
     component: Hero, 
     props: true
     },

  ]
})



