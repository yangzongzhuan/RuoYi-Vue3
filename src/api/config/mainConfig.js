import request from '@/utils/request'

// 查询网站配置列表
export function listMainConfig(query) {
  return request({
    url: '/config/mainConfig/list',
    method: 'get',
    params: query
  })
}

// 查询网站配置详细
export function getMainConfig(id) {
  return request({
    url: '/config/mainConfig/' + id,
    method: 'get'
  })
}

// 新增网站配置
export function addMainConfig(data) {
  return request({
    url: '/config/mainConfig',
    method: 'post',
    data: data
  })
}

// 修改网站配置
export function updateMainConfig(data) {
  return request({
    url: '/config/mainConfig',
    method: 'put',
    data: data
  })
}

// 删除网站配置
export function delMainConfig(id) {
  return request({
    url: '/config/mainConfig/' + id,
    method: 'delete'
  })
}
