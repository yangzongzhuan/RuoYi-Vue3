import request from '@/utils/request'
type params = string | number | null | undefined
// 查询岗位列表
export function listPost(query: any): Promise<any> {
  return request({
    url: '/system/post/list',
    method: 'get',
    params: query
  })
}

// 查询岗位详细
export function getPost(postId: params): Promise<any> {
  return request({
    url: '/system/post/' + postId,
    method: 'get'
  })
}

// 新增岗位
export function addPost(data: any): Promise<any> {
  return request({
    url: '/system/post',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePost(data: any): Promise<any> {
  return request({
    url: '/system/post',
    method: 'put',
    data: data
  })
}

// 删除岗位
export function delPost(postId: params): Promise<any> {
  return request({
    url: '/system/post/' + postId,
    method: 'delete'
  })
}
