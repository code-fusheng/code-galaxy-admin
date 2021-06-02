import { createApp } from 'vue'
import App from './App.vue'

// 在 main 中挂载路由配置
import router from '@/router/index'

import store from '@/store/index'

// 在 main 中挂载 Element plus
import ElementPlus, { ElMessage } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import * as echarts from 'echarts'

import { resetForm, handleTree } from '@/utils/tools'

const app = createApp(App)
app.config.globalProperties.$resetForm = resetForm
app.config.globalProperties.$handleTree = handleTree
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$message = ElMessage
app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
