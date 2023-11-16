import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 发起跨域请求时携带 cookies
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 请求发送前做点什么

    if (store.getters.token) {
      // 让每个请求都携带令牌
      // ['X-Token'] 是自定义请求头的键
      // 请根据实际情况修改
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 请求错误处理
    console.log(error) // 用于调试
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  /**
   * 如果需要获取 http 信息，如头部或状态码
   * 请返回 response => response
  */

  /**
   * 根据自定义代码判断请求状态
   * 这只是一个示例
   * 你也可以根据 HTTP 状态码判断状态
   */
  response => {
    const res = response.data

    // 如果自定义代码不是 20000，则判断为错误
    if (res.code !== 20000) {
      Message({
        message: res.message || '错误',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: 非法令牌; 50012: 其他客户端已登录; 50014: 令牌已过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 登出重置令牌
        MessageBox.confirm('您已被登出，可取消保留在当前页面，或重新登录', '确认登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || '错误'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // 用于调试
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
