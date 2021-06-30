import router from './router'
import store from './store'

// 导入cookie.js工具
import {PcCookie, Key} from '@/utils/cookie'

const whiteList = ['/login']

/**
 * 1、从 cookie 获取 token (导入 cookie.ts)
 * 2、如果有 token -->
 * 3、如果没有 token --> 则从白名单中查询是否包含当前目标路由 包含->放行;不包含->跳转登录
 */
router.beforeEach(async(to, from, next) => {
    const hasToken = PcCookie.get(Key.accessTokenKey)

    if(hasToken) {
      store.commit('setToken', hasToken)
      next()
    } else {
      if (import.meta.env.VITE_APP_MARK == 'dev') {
        window.location.href = `http://localhost:7000?redirectURL=${window.location.href}`
      } else {
        window.location.href = `http://login.fusheng.xyz:7000?redirectURL=${window.location.href}`
      }

    }
  }
)
