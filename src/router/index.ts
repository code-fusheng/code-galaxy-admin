// 路由配置文件
import { createRouter, createMemoryHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Layout',
        component: () => import('@/layout/appMain.vue'),
        children: [
          {
            path: '/',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index.vue')
          }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
