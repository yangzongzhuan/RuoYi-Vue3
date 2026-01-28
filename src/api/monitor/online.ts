import request from '@/utils/request'
import type { OnlineQueryParams, SysUserOnline, AjaxResult, TableDataInfo } from '@/types'

// 查询在线用户列表
export function list(query: OnlineQueryParams): Promise<TableDataInfo<SysUserOnline[]>> {
  return request({
    url: '/monitor/online/list',
    method: 'get',
    params: query
  })
}

// 强退用户
export function forceLogout(tokenId: string): Promise<AjaxResult> {
  return request({
    url: '/monitor/online/' + tokenId,
    method: 'delete'
  })
}
