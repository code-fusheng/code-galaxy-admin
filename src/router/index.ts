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
    ]
  },
  {
    path: '/base',
    component: Layout,
    redirect: '/base/dictType',
    children: [
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
    redirect: '/exam/exam',
    children: [
      {
        path: 'exam',
        name: 'Exam',
        component: () => import('@/views/exam/exam/exam-list.vue')
      },
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
      {
        path: 'paperInfo/:paperId',
        name: 'PaperInfo',
        component: () => import('@/views/exam/paper/paper-info.vue')
      },
      {
        path: 'grades',
        name: 'Grades',
        component: () => import('@/views/exam/paper/paper-list.vue')
      },
    ]
  },
  {
    path: "/sys",
    component: Layout,
    redirect: '/sys/sysLog',
    children: [
      {
        path: 'sysLog',
        name: 'SysLog',
        component: () => import('@/views/sys/sysLog/sysLog-index.vue')
      },
      {
        path: 'operaLog',
        name: 'OperaLog',
        component: () => import('@/views/sys/operaLog/operaLog-index.vue')
      },
      {
        path: 'druid',
        name: 'Druid',
        component: () => import('@/views/sys/druid/druid-index.vue')
      },
      {
        path: 'swagger',
        name: 'Swagger',
        component: () => import('@/views/sys/swagger/swagger-index.vue')
      },
    ]
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
