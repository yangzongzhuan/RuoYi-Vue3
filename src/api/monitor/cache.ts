/*
 * @Description:
 * @Author: Panda
 * @Date: 2024-02-27 15:19:24
 * @LastEditors: Panda
 * @LastEditTime: 2024-02-28 15:42:12
 * @FilePath: \shop-admind:\vueworkspace\RuoYi-Vue3\src\api\monitor\cache.ts
 */
import request from '@/utils/request'

// 查询缓存详细
export function getCache(): Promise<any> {
  return request({
    url: '/monitor/cache',
    method: 'get'
  })
}

// 查询缓存名称列表
export function listCacheName(): Promise<any> {
  return request({
    url: '/monitor/cache/getNames',
    method: 'get'
  })
}

// 查询缓存键名列表
export function listCacheKey(cacheName: string): Promise<any> {
  return request({
    url: '/monitor/cache/getKeys/' + cacheName,
    method: 'get'
  })
}

// 查询缓存内容
export function getCacheValue(cacheName: string, cacheKey: string): Promise<any> {
  return request({
    url: '/monitor/cache/getValue/' + cacheName + '/' + cacheKey,
    method: 'get'
  })
}

// 清理指定名称缓存
export function clearCacheName(cacheName: string): Promise<any> {
  return request({
    url: '/monitor/cache/clearCacheName/' + cacheName,
    method: 'delete'
  })
}

// 清理指定键名缓存
export function clearCacheKey(cacheKey: string): Promise<any> {
  return request({
    url: '/monitor/cache/clearCacheKey/' + cacheKey,
    method: 'delete'
  })
}

// 清理全部缓存
export function clearCacheAll(): Promise<any> {
  return request({
    url: '/monitor/cache/clearCacheAll',
    method: 'delete'
  })
}
