import request from '@/utils/request'

// 查询友链管理列表
export function listLinkManege(query) {
  return request({
    url: '/link/linkManege/list',
    method: 'get',
    params: query
  })
}

// 查询友链管理详细
export function getLinkManege(id) {
  return request({
    url: '/link/linkManege/' + id,
    method: 'get'
  })
}

// 新增友链管理
export function addLinkManege(data) {
  return request({
    url: '/link/linkManege',
    method: 'post',
    data: data
  })
}

// 修改友链管理
export function updateLinkManege(data) {
  return request({
    url: '/link/linkManege',
    method: 'put',
    data: data
  })
}

// 删除友链管理
export function delLinkManege(id) {
  return request({
    url: '/link/linkManege/' + id,
    method: 'delete'
  })
}
