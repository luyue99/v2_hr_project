// 从 '@/settings' 导入默认设置
import defaultSettings from '@/settings'

// 从defaultSettings中解构出showSettings、fixedHeader和sidebarLogo
const { showSettings, fixedHeader, sidebarLogo } = defaultSettings

// 定义state，包括showSettings、fixedHeader和sidebarLogo的值
const state = {
  showSettings: showSettings, // ???? showSettings 没看到里面有设置
  fixedHeader: fixedHeader, // 默认false
  sidebarLogo: sidebarLogo // 默认false
}

// 定义mutation，用于修改setting的值
const mutations = {
  /* 改变设置 */
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
