import Cookies from 'js-cookie'

// 定义常量，用于保存 token
const TokenKey = 'vue_admin_template_token'

// 获取 token
export function getToken() {
  return Cookies.get(TokenKey)
}

// 设置 token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

// 移除 token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
