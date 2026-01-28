import request from '@/utils/request'
import type { NoticeQueryParams, SysNotice, AjaxResult, TableDataInfo } from '@/types'

// 查询公告列表
export function listNotice(query: NoticeQueryParams): Promise<TableDataInfo<SysNotice[]>> {
  return request({
    url: '/system/notice/list',
    method: 'get',
    params: query
  })
}

// 查询公告详细
export function getNotice(noticeId: number): Promise<AjaxResult<SysNotice>> {
  return request({
    url: '/system/notice/' + noticeId,
    method: 'get'
  })
}

// 新增公告
export function addNotice(data: SysNotice): Promise<AjaxResult> {
  return request({
    url: '/system/notice',
    method: 'post',
    data: data
  })
}

// 修改公告
export function updateNotice(data: SysNotice): Promise<AjaxResult> {
  return request({
    url: '/system/notice',
    method: 'put',
    data: data
  })
}

// 删除公告
export function delNotice(noticeId: number | number[]): Promise<AjaxResult> {
  return request({
    url: '/system/notice/' + noticeId,
    method: 'delete'
  })
}
