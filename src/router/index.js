import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login.vue')
    },
    {
      name: 'home',
      path: '/',
      component: () => import('@/views/home.vue')
    }
  ]
})
