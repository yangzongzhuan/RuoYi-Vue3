import request from '@/utils/request'

// 查询文章分类列表
export function listCategory(query) {
  return request({
    url: '/article/category/list',
    method: 'get',
    params: query
  })
}

// 查询文章分类详细
export function getCategory(id) {
  return request({
    url: '/article/category/' + id,
    method: 'get'
  })
}

// 新增文章分类
export function addCategory(data) {
  return request({
    url: '/article/category',
    method: 'post',
    data: data
  })
}

// 修改文章分类
export function updateCategory(data) {
  return request({
    url: '/article/category',
    method: 'put',
    data: data
  })
}

// 删除文章分类
export function delCategory(id) {
  return request({
    url: '/article/category/' + id,
    method: 'delete'
  })
}
