/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * 判断给定的路径是否是外部链接
 * @param {string} path - 要判断的路径
 * @returns {Boolean} - 如果是外部链接返回true，否则返回false
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 判断给定的字符串是否是有效的用户名
 * @param {string} str - 要判断的字符串
 * @returns {Boolean} - 如果是有效的用户名返回true，否则返回false
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
