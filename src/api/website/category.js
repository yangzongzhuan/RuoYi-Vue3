import request from '@/utils/request'

// 查询站点分类列表
export function listCategory(query) {
  return request({
    url: '/website/category/list',
    method: 'get',
    params: query
  })
}

// 查询站点分类详细
export function getCategory(id) {
  return request({
    url: '/website/category/' + id,
    method: 'get'
  })
}

// 新增站点分类
export function addCategory(data) {
  return request({
    url: '/website/category',
    method: 'post',
    data: data
  })
}

// 修改站点分类
export function updateCategory(data) {
  return request({
    url: '/website/category',
    method: 'put',
    data: data
  })
}

// 删除站点分类
export function delCategory(id) {
  return request({
    url: '/website/category/' + id,
    method: 'delete'
  })
}
