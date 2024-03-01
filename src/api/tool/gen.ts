/*
 * @Description: 
 * @Author: Panda
 * @Date: 2024-02-27 15:19:25
 * @LastEditors: Panda
 * @LastEditTime: 2024-02-28 15:58:45
 * @FilePath: \shop-admind:\vueworkspace\RuoYi-Vue3\src\api\tool\gen.ts
 */
import request from '@/utils/request'
type params = string | number | null | undefined
// 查询生成表数据
export function listTable(query:any): Promise<any> {
  return request({
    url: '/tool/gen/list',
    method: 'get',
    params: query
  })
}
// 查询db数据库列表
export function listDbTable(query:any): Promise<any> {
  return request({
    url: '/tool/gen/db/list',
    method: 'get',
    params: query
  })
}

// 查询表详细信息
export function getGenTable(tableId:params) : Promise<any>{
  return request({
    url: '/tool/gen/' + tableId,
    method: 'get'
  })
}

// 修改代码生成信息
export function updateGenTable(data:any): Promise<any> {
  return request({
    url: '/tool/gen',
    method: 'put',
    data: data
  })
}

// 导入表
export function importTable(data:any): Promise<any> {
  return request({
    url: '/tool/gen/importTable',
    method: 'post',
    params: data
  })
}

// 预览生成代码
export function previewTable(tableId:params): Promise<any> {
  return request({
    url: '/tool/gen/preview/' + tableId,
    method: 'get'
  })
}

// 删除表数据
export function delTable(tableId:params): Promise<any> {
  return request({
    url: '/tool/gen/' + tableId,
    method: 'delete'
  })
}

// 生成代码（自定义路径）
export function genCode(tableName:params): Promise<any> {
  return request({
    url: '/tool/gen/genCode/' + tableName,
    method: 'get'
  })
}

// 同步数据库
export function synchDb(tableName:params): Promise<any> {
  return request({
    url: '/tool/gen/synchDb/' + tableName,
    method: 'get'
  })
}
