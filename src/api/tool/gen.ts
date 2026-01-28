import request from '@/utils/request'
import type { GenQueryParams, GenTable, GenTableInfoResult, AjaxResult, TableDataInfo } from '@/types'

// 查询生成表数据
export function listTable(query: GenQueryParams): Promise<TableDataInfo<GenTable>> {
  return request({
    url: '/tool/gen/list',
    method: 'get',
    params: query
  })
}

// 查询db数据库列表
export function listDbTable(query: GenQueryParams): Promise<TableDataInfo<GenTable>> {
  return request({
    url: '/tool/gen/db/list',
    method: 'get',
    params: query
  })
}

// 查询表详细信息
export function getGenTable(tableId: number): Promise<AjaxResult<GenTableInfoResult>> {
  return request({
    url: '/tool/gen/' + tableId,
    method: 'get'
  })
}

// 修改代码生成信息
export function updateGenTable(data: GenTable): Promise<AjaxResult> {
  return request({
    url: '/tool/gen',
    method: 'put',
    data: data
  })
}

// 导入表
export function importTable(data: any): Promise<AjaxResult> {
  return request({
    url: '/tool/gen/importTable',
    method: 'post',
    params: data
  })
}

// 创建表
export function createTable(data: any): Promise<AjaxResult> {
  return request({
    url: '/tool/gen/createTable',
    method: 'post',
    params: data
  })
}

// 预览生成代码
export function previewTable(tableId: number): Promise<AjaxResult<any>> {
  return request({
    url: '/tool/gen/preview/' + tableId,
    method: 'get'
  })
}

// 删除表数据
export function delTable(tableId: number | number[]): Promise<AjaxResult> {
  return request({
    url: '/tool/gen/' + tableId,
    method: 'delete'
  })
}

// 生成代码（自定义路径）
export function genCode(tableName: string): Promise<AjaxResult> {
  return request({
    url: '/tool/gen/genCode/' + tableName,
    method: 'get'
  })
}

// 同步数据库
export function synchDb(tableName: string): Promise<AjaxResult> {
  return request({
    url: '/tool/gen/synchDb/' + tableName,
    method: 'get'
  })
}

