import request from '@/utils/request'

// 查询seo推送记录列表
export function listHistory(query) {
  return request({
    url: '/seo/history/list',
    method: 'get',
    params: query
  })
}

// 查询seo推送记录详细
export function getHistory(id) {
  return request({
    url: '/seo/history/' + id,
    method: 'get'
  })
}

// 新增seo推送记录
export function addHistory(data) {
  return request({
    url: '/seo/history',
    method: 'post',
    data: data
  })
}

// 修改seo推送记录
export function updateHistory(data) {
  return request({
    url: '/seo/history',
    method: 'put',
    data: data
  })
}

// 删除seo推送记录
export function delHistory(id) {
  return request({
    url: '/seo/history/' + id,
    method: 'delete'
  })
}
