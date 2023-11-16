import defaultSettings from '@/settings'

// 定义默认标题为 Vue Admin Template，若存在传入的页面标题，则拼接上默认标题
const title = defaultSettings.title || 'Vue Admin Template'

// 函数，接收一个页面标题参数
export default function getPageTitle(pageTitle) {
  // 若传入的页面标题存在，则拼接上默认标题返回
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  // 若传入的页面标题不存在，则只返回默认标题
  return `${title}`
}
