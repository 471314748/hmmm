import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/login'
import Home from '@/views/home/home'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]

// const router = new VueRouter({
//   routes
})

export default router
