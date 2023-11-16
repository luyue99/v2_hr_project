import request from '@/utils/request'

/**
 * 用户登录
 * @param {object} data 登录表单数据
 * @returns {Promise} 返回一个Promise对象
 */
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @param {string} token 用户登录凭证
 * @returns {Promise} 返回一个Promise对象
 */
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

/**
 * 用户退出登录
 * @returns {Promise} 返回一个Promise对象
 */
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
