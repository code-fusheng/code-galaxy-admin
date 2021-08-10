// Axios 配置工具类
import Axios from 'axios';
import { ElMessage } from 'element-plus';
import { error } from 'node:console';
import store from '../store/index';
import {PcCookie, Key} from '@/utils/cookie'

const baseURL = 'http://localhost:9999';

const axios = Axios.create({
  baseURL: '/admin',
  timeout: 20000,
});

// 前置拦截器（发起请求前的拦截）
axios.interceptors.request.use(
  (config) => {
    /**
         * 这里根据项目的实际情况处理 config
         * 如果不做任何处理，直接返回 config
         */
    if (store.getters.token) {
      config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// 后置拦截器（获取响应时的拦截）
axios.interceptors.response.use(
  (response) => {
    // console.log(response.data)
    const { msg } = response.data;
    // ElMessage.success(`${msg}`)
    return response.data;
  },
  (error) => {
    if (error.response && error.response.data) {
      const status = error.response.status;
      const { msg, code } = error.response.data;
      ElMessage.error(`Code:${code}, Message:${msg}`);
      console.error('[Axios Error], error.response');
      console.log(error.response)
      if ( code == 10004 || code == 401) {
        if (import.meta.env.VITE_APP_MARK == 'dev') {
          setTimeout(window.location.href = `http://localhost:7000?redirectURL=${window.location.href}` , 3000)
        } else {
          setTimeout(window.location.href = `http://login.fusheng.xyz:7000?redirectURL=${window.location.href}`, 3000)
        }
      }
    } else {
      ElMessage.error(`${error}`);
    }
    return Promise.reject(error);
  },
);

export default axios;
