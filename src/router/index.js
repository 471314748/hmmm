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
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/home',
      redirect: '/home/subject',
      component: Home,
      children: [
        {
          path: 'chart',
          component: Chart,
          meta: {
            title: '数据概览'
          }
        },
        {
          path: 'business',
          component: Business,
          meta: {
            title: '企业列表'
          }
        },
        {
          path: 'question',
          component: Question,
          meta: {
            title: '题库列表'
          }
        },
        {
          path: 'subject',
          component: Subject,
          meta: {
            title: '学科列表'
          }
        },
        {
          path: 'userList',
          component: UserList,
          meta: {
            title: '用户列表'
          }
        }
      ]
    }
  ]
})
// 导航守卫
// 进入前守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
// 进入后守卫
router.afterEach((to) => {
  NProgress.done()
  document.title = to.meta.title
})

export default router
