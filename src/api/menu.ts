import request from '@/utils/request'

// 获取路由
export  function getRouters(): Promise<any> {
  return request({
    url: '/getRouters',
    method: 'get'
  })
}