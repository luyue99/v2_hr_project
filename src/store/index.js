import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

// 创建并配置Vuex store
const store = new Vuex.Store({
  modules: {
    app, // 应用模块
    settings, // 设置模块
    user // 用户模块
  },
  getters // 使用自定义的getters
})

export default store
