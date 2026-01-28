import request from '@/utils/request'
import type { ConfigQueryParams, SysConfig, AjaxResult, TableDataInfo } from '@/types'

// 查询参数列表
export function listConfig(query: ConfigQueryParams): Promise<TableDataInfo<SysConfig[]>> {
  return request({
    url: '/system/config/list',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getConfig(configId: number): Promise<AjaxResult<SysConfig>> {
  return request({
    url: '/system/config/' + configId,
    method: 'get'
  })
}

// 根据参数键名查询参数值
export function getConfigKey(configKey: string): Promise<AjaxResult> {
  return request({
    url: '/system/config/configKey/' + configKey,
    method: 'get'
  })
}

// 新增参数配置
export function addConfig(data: SysConfig): Promise<AjaxResult> {
  return request({
    url: '/system/config',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateConfig(data: SysConfig): Promise<AjaxResult> {
  return request({
    url: '/system/config',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delConfig(configId: number | number[]): Promise<AjaxResult> {
  return request({
    url: '/system/config/' + configId,
    method: 'delete'
  })
}

// 刷新参数缓存
export function refreshCache(): Promise<AjaxResult> {
  return request({
    url: '/system/config/refreshCache',
    method: 'delete'
  })
}
