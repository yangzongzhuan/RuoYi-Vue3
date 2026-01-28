import request from '@/utils/request'
import type { PostQueryParams, SysPost, AjaxResult, TableDataInfo } from '@/types'

// 查询岗位列表
export function listPost(query: PostQueryParams): Promise<TableDataInfo<SysPost[]>> {
  return request({
    url: '/system/post/list',
    method: 'get',
    params: query
  })
}

// 查询岗位详细
export function getPost(postId: number): Promise<AjaxResult<SysPost>> {
  return request({
    url: '/system/post/' + postId,
    method: 'get'
  })
}

// 新增岗位
export function addPost(data: SysPost): Promise<AjaxResult> {
  return request({
    url: '/system/post',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePost(data: SysPost): Promise<AjaxResult> {
  return request({
    url: '/system/post',
    method: 'put',
    data: data
  })
}

// 删除岗位
export function delPost(postId: number | number[]): Promise<AjaxResult> {
  return request({
    url: '/system/post/' + postId,
    method: 'delete'
  })
}
