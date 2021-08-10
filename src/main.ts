import { createApp } from 'vue'
import App from './App.vue'

// 在 main 中挂载路由配置
import router from '@/router/index'
import store from '@/store/index'
import Cookies  from 'js-cookie'

import '@/permission'

// 在 main 中挂载 Element plus
import ElementPlus, { ElMessageBox, ElMessage } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import AntDesign from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'

import * as echarts from 'echarts'

import { resetForm, handleTree } from '@/utils/tools'

const app = createApp(App)
app.config.globalProperties.$resetForm = resetForm
app.config.globalProperties.$handleTree = handleTree
app.config.globalProperties.$echarts = echarts
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$messageBox = ElMessageBox
app.config.globalProperties.$Cookies = Cookies
app.use(router)
app.use(store)
app.use(ElementPlus, { locale })
app.use(AntDesign)
app.use(mavonEditor)
app.mount('#app')
