import { createApp } from 'vue'
import App from './App.vue'

// 在 main 中挂载路由配置
import router from './router/index'

// 在 main 中挂载 Element plus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'


createApp(App)
.use(router)
.use(ElementPlus)
.mount('#app')
