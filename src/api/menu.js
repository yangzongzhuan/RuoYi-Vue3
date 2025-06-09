import request from '@/utils/request'

// 获取路由
export function getRouters() {
  return request({
    url: '/getRouters',
    method: 'get',
  })
}
