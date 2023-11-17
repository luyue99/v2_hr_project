// 导入API函数和工具函数
// 导入登录、登出、获取用户信息的API
import { login, logout, getInfo } from '@/api/user'
// 导入获取和设置Token的工具函数
import { getToken, setToken, removeToken } from '@/utils/auth'
// 导入重置路由的函数
import { resetRouter } from '@/router'

// 获取默认状态
const getDefaultState = () => {
  // 获取token
  return {
    token: getToken(), // 获取用户token
    name: '', // 初始化名称为空字符串
    avatar: '' // 初始化头像为空字符串
  }
}

// 初始化状态
const state = getDefaultState()

// 需要触发mutation的方法
const mutations = {
  // 重置状态
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 设置token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 设置name
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 设置avatar
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

// 需要触发action的方法
const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // 必须先移除token
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 重置token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 必须先移除token
      commit('RESET_STATE')
      resolve()
    })
  }
}

// 定义module
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

