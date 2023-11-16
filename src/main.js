import Vue from 'vue'

import 'normalize.css/normalize.css' // 使用 normalize.css 作为 CSS 重置

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 导入 ElementUI 的主题
import locale from 'element-ui/lib/locale/lang/en' // 导入语言包（en表示英文）

import '@/styles/index.scss' // 导入全局样式

import App from './App' // 导入 App 组件
import store from './store' // 导入 store
import router from './router' // 导入路由

import '@/icons' // 导入图标
import '@/permission' // 导入权限控制

/**
 * 如果你不想使用 mock-server
 * 你可以使用 MockJs 作为 mock api
 * 你可以执行：mockXHR()
 *
 * 目前 MockJs 会在生产环境使用，
 * 在上线前请将其移除！
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// 将 ElementUI 的语言设置为 EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
