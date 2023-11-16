// 导入API函数和工具函数
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

// 获取默认状态
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
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

