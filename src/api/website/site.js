import request from '@/utils/request'

// 查询站点管理列表
export function listSite(query) {
  return request({
    url: '/website/site/list',
    method: 'get',
    params: query
  })
}

// 查询站点管理详细
export function getSite(id) {
  return request({
    url: '/website/site/' + id,
    method: 'get'
  })
}

// 新增站点管理
export function addSite(data) {
  return request({
    url: '/website/site',
    method: 'post',
    data: data
  })
}

// 修改站点管理
export function updateSite(data) {
  return request({
    url: '/website/site',
    method: 'put',
    data: data
  })
}

// 删除站点管理
export function delSite(id) {
  return request({
    url: '/website/site/' + id,
    method: 'delete'
  })
}
