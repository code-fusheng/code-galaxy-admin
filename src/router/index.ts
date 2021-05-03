// 路由配置文件
import { createRouter, createMemoryHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'
/* Layout */
import Layout from '@/layout/appMain.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Layout',
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
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
