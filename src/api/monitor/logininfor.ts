import request from '@/utils/request'
import type { LogininforQueryParams, SysLogininfor, AjaxResult, TableDataInfo } from '@/types'

// 查询登录日志列表
export function list(query: LogininforQueryParams): Promise<TableDataInfo<SysLogininfor[]>> {
  return request({
    url: '/monitor/logininfor/list',
    method: 'get',
    params: query
  })
}

// 删除登录日志
export function delLogininfor(infoId: number | number[]): Promise<AjaxResult> {
  return request({
    url: '/monitor/logininfor/' + infoId,
    method: 'delete'
  })
}

// 解锁用户登录状态
export function unlockLogininfor(userName: string): Promise<AjaxResult> {
  return request({
    url: '/monitor/logininfor/unlock/' + userName,
    method: 'get'
  })
}

// 清空登录日志
export function cleanLogininfor(): Promise<AjaxResult> {
  return request({
    url: '/monitor/logininfor/clean',
    method: 'delete'
  })
}
