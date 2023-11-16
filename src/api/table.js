import request from '@/utils/request'

/**
 * 获取列表
 * @param {object} params - 请求参数
 * @returns {Promise} - 返回一个Promise对象
 */
export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
