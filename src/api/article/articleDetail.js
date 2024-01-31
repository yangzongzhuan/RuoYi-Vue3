import request from '@/utils/request'

// 查询文章列表
export function listArticleDetail(query) {
  return request({
    url: '/article/articleDetail/list',
    method: 'get',
    params: query
  })
}

// 查询文章详细
export function getArticleDetail(id) {
  return request({
    url: '/article/articleDetail/' + id,
    method: 'get'
  })
}

// 新增文章
export function addArticleDetail(data) {
  return request({
    url: '/article/articleDetail',
    method: 'post',
    data: data
  })
}

// 修改文章
export function updateArticleDetail(data) {
  return request({
    url: '/article/articleDetail',
    method: 'put',
    data: data
  })
}

// 删除文章
export function delArticleDetail(id) {
  return request({
    url: '/article/articleDetail/' + id,
    method: 'delete'
  })
}
