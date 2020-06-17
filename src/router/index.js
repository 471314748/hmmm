import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/login'
import Home from '@/views/home/home'

import Chart from '@/views/home/chart/chart.vue'
import Business from '@/views/home/business/business.vue'
import Question from '@/views/home/question/question.vue'
import Subject from '@/views/home/subject/subject.vue'
import UserList from '@/views/home/userList/userList.vue'
// 路由导航守卫
// 进入前守卫
// 导入nprogress   start()开启    done()结束
import NProgress from 'nprogress'
// 导入nprogress对应css
import 'nprogress/nprogress.css'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      redirect: '/home/subject',
      component: Home,
      children: [
        {
          path: 'chart',
          component: Chart
        },
        {
          path: 'business',
          component: Business
        },
        {
          path: 'question',
          component: Question
        },
        {
          path: 'subject',
          component: Subject
        },
        {
          path: 'userList',
          component: UserList
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log('to', to)
  // console.log('from', from)
  NProgress.start()
  // setTimeout(() => {
  next()
  // }, 500)
})
// 进入后守卫
router.afterEach(() => {
  NProgress.done()
  // 进度条结束
  // NProgress.done()
  console.log('进入相应路由')
})

export default router
