import request from '@/utils/request'
import type { DictTypeQueryParams, SysDictType, AjaxResult, TableDataInfo } from '@/types'

// 查询字典类型列表
export function listType(query: DictTypeQueryParams): Promise<TableDataInfo<SysDictType[]>> {
  return request({
    url: '/system/dict/type/list',
    method: 'get',
    params: query
  })
}

// 查询字典类型详细
export function getType(dictId: number): Promise<AjaxResult<SysDictType>> {
  return request({
    url: '/system/dict/type/' + dictId,
    method: 'get'
  })
}

// 新增字典类型
export function addType(data: SysDictType): Promise<AjaxResult> {
  return request({
    url: '/system/dict/type',
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function updateType(data: SysDictType): Promise<AjaxResult> {
  return request({
    url: '/system/dict/type',
    method: 'put',
    data: data
  })
}

// 删除字典类型
export function delType(dictId: number | number[]): Promise<AjaxResult> {
  return request({
    url: '/system/dict/type/' + dictId,
    method: 'delete'
  })
}

// 刷新字典缓存
export function refreshCache(): Promise<AjaxResult> {
  return request({
    url: '/system/dict/type/refreshCache',
    method: 'delete'
  })
}

// 获取字典选择框列表
export function optionselect(): Promise<AjaxResult<SysDictType[]>> {
  return request({
    url: '/system/dict/type/optionselect',
    method: 'get'
  })
}
