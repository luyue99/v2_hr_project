import defaultSettings from '@/settings'

// 从defaultSettings中解构出showSettings、fixedHeader和sidebarLogo
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

// 定义state，包括showSettings、fixedHeader和sidebarLogo的值
const state = {
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo
}

// 定义mutation，用于修改setting的值
const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // 判断state中是否存在key
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

// 定义action，用于提交mutation
const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

// 导出命名空间
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
