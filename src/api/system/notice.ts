import request from '@/utils/request'
type params = string | number | null | undefined
// 查询公告列表
export function listNotice(query: any): Promise<any> {
  return request({
    url: '/system/notice/list',
    method: 'get',
    params: query
  })
}

// 查询公告详细
export function getNotice(noticeId: params): Promise<any> {
  return request({
    url: '/system/notice/' + noticeId,
    method: 'get'
  })
}

// 新增公告
export function addNotice(data: any): Promise<any> {
  return request({
    url: '/system/notice',
    method: 'post',
    data: data
  })
}

// 修改公告
export function updateNotice(data: any): Promise<any> {
  return request({
    url: '/system/notice',
    method: 'put',
    data: data
  })
}

// 删除公告
export function delNotice(noticeId: params): Promise<any> {
  return request({
    url: '/system/notice/' + noticeId,
    method: 'delete'
  })
}