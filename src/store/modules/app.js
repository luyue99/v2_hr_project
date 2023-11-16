import Cookies from 'js-cookie'

// 定义状态
const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true, // 获取侧边栏状态 cookie，若不存在则默认打开
    withoutAnimation: false // 侧边栏是否无动画
  },
  device: 'desktop' // 设备类型，默认为台式机
}

// 定义状态变更的 mutation
const mutations = {
  TOGGLE_SIDEBAR: state => {
    // 切换侧边栏的打开和关闭状态
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false

    // 根据侧边栏的打开状态更新 cookie
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    // 关闭侧边栏
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    // 切换设备类型
    state.device = device
  }
}

// 定义可执行的 action
const actions = {
  toggleSideBar({ commit }) {
    // 切换侧边栏的打开和关闭状态
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    // 关闭侧边栏
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    // 切换设备类型
    commit('TOGGLE_DEVICE', device)
  }
}

// 导出模块对象
export default {
  namespaced: true, // 指定命名空间为 true
  state, // 注册状态
  mutations, // 注册状态变更的 mutation
  actions // 注册可执行的 action
}
