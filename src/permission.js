import router from './router' // 导入路由
import store from './store' // 导入store
import { Message } from 'element-ui' // 导入Element UI库中的Message组件
import NProgress from 'nprogress' // 导入NProgress库 // NProgress是一个用于显示进度条的库
import 'nprogress/nprogress.css' // 导入NProgress的样式 // 用于为进度条添加样式
import { getToken } from '@/utils/auth' // 导入getToken函数 // getToken函数用于从cookie中获取token
import getPageTitle from '@/utils/get-page-title' // 导入getPageTitle函数 // getPageTitle函数用于获取页面标题

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // 不重定向白名单

// 在每个导航钩子之前启动progress bar
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 启动进度条

  // 设置页面标题
  document.title = getPageTitle(to.meta.title)

  // 获取访问令牌
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已登录，重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      // 检查是否存在获取用户信息的方法
      if (hasGetUserInfo) {
        // 如果存在，则继续下一个路由守卫
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')
          // 等待获取用户信息的异步操作完成
          next()
        } catch (error) {
          // 如果出现错误，则移除token并重新登录到登录页
          await store.dispatch('user/resetToken')
          // 弹出错误信息
          Message.error(error || '出错')
          // 跳转到登录页面，并传递跳转的路径参数
          next(`/login?redirect=${to.path}`)
          // 完成路由守卫
          NProgress.done()
        }
      }
    }
  } else {
    /* 无token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // 在自由登录白名单中，直接进入
      next()
    } else {
      // 其他页面重定向到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 完成progress bar
  NProgress.done()
})
