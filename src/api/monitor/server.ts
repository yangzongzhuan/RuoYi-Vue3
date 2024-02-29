import request from '@/utils/request'

// 获取服务信息
export function getServer(): Promise<any> {
  return request({
    url: '/monitor/server',
    method: 'get'
  })
}