import request from '@/utils/request'
type params = string | number | null | undefined
// 查询在线用户列表
export function list(query: any): Promise<any> {
  return request({
    url: '/monitor/online/list',
    method: 'get',
    params: query
  })
}

// 强退用户
export function forceLogout(tokenId: params): Promise<any> {
  return request({
    url: '/monitor/online/' + tokenId,
    method: 'delete'
  })
}
