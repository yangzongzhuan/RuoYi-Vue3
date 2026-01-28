import request from '@/utils/request'
import type { DictDataQueryParams, SysDictData, AjaxResult, TableDataInfo } from '@/types'

// 查询字典数据列表
export function listData(query: DictDataQueryParams): Promise<TableDataInfo<SysDictData[]>> {
  return request({
    url: '/system/dict/data/list',
    method: 'get',
    params: query
  })
}

// 查询字典数据详细
export function getData(dictCode: number): Promise<AjaxResult<SysDictData>> {
  return request({
    url: '/system/dict/data/' + dictCode,
    method: 'get'
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType: string): Promise<AjaxResult<SysDictData[]>> {
  return request({
    url: '/system/dict/data/type/' + dictType,
    method: 'get'
  })
}

// 新增字典数据
export function addData(data: SysDictData): Promise<AjaxResult> {
  return request({
    url: '/system/dict/data',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(data: SysDictData): Promise<AjaxResult> {
  return request({
    url: '/system/dict/data',
    method: 'put',
    data: data
  })
}

// 删除字典数据
export function delData(dictCode: number | number[]): Promise<AjaxResult> {
  return request({
    url: '/system/dict/data/' + dictCode,
    method: 'delete'
  })
}
