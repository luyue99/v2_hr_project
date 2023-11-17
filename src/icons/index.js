import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// 引入 svg 目录下的所有 .svg 文件
// require.context(参1:目标目录,参2是否扫描子目录,参3:正则表达式)扫描目录中文件
const req = require.context('./svg', false, /\.svg$/)

const requireAll = requireContext => requireContext.keys().map(requireContext) // 定义一个高阶函数requireAll，它接受一个参数requireContext
requireAll(req) // 调用requireAll函数，并传入参数req
