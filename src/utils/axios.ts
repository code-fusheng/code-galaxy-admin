// Axios 配置工具类
import Axios from 'axios'
import { ElMessage } from 'element-plus'
import { error } from 'node:console'
import store from '../store/index'

const baseURL = 'http://localhost:9999'

const axios = Axios.create({
    baseURL: '/api',
    timeout: 20000
})

// 前置拦截器（发起请求前的拦截）
axios.interceptors.request.use(
    (config) => {
        /**
         * 这里根据项目的实际情况处理 config
         * 如果不做任何处理，直接返回 config
         */
        if (store.getters.token) {
          config.headers['Authorization'] = 'Bearer ' + store.getters.token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 后置拦截器（获取响应时的拦截）
axios.interceptors.response.use(
    (response) => {
        // console.log(response.data)
        const msg = response.data.msg
        // ElMessage.success(`${msg}`)
        return response.data
    },
    (error) => {
        if (error.response && error.response.data) {
            const code = error.response.status
            const msg = error.response.data.msg
            ElMessage.error(`Code:${code}, Message:${msg}`)
            console.error(`[Axios Error], error.response`)
        } else {
            ElMessage.error(`${error}`)
        }
        return Promise.reject(error)
    }
)

export default axios
