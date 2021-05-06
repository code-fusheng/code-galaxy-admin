// 路由配置文件
import { createRouter, createMemoryHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
/* Layout */
import Layout from '@/layout/appMain.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue')
      },
      {
        path: 'dictType',
        name: 'DictType',
        component: () => import('@/views/base/dict/type/type-list.vue')
      },
      {
        path: 'dictData/:dictType',
        name: 'DictData',
        component: () => import('@/views/base/dict/data/data-list.vue')
      }
    ]
  },
  {
    path: '/exam',
    component: Layout,
    redirect: '/exam/repository',
    children: [
      {
        path: 'repository',
        name: 'Repository',
        component: () => import('@/views/exam/repository/repository-list.vue')
      },
      {
        path: 'question',
        name: 'Question',
        component: () => import('@/views/exam/question/question-list.vue')
      },
      {
        path: 'questionInfo/:questionId',
        name: 'QuestionInfo',
        component: () => import('@/views/exam/question/question-info.vue')
      },
      {
        path: 'rule',
        name: 'Rule',
        component: () => import('@/views/exam/rule/rule-list.vue')
      },
      {
        path: 'paper',
        name: 'Paper',
        component: () => import('@/views/exam/paper/paper-list.vue')
      },
    ]
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
