import request from '@/utils/request'

type params = string | number | null | undefined

// 查询登录日志列表
export function list(query: any): Promise<any> {
  return request({
    url: '/monitor/logininfor/list',
    method: 'get',
    params: query
  })
}

// 删除登录日志
export function delLogininfor(infoId: params): Promise<any> {
  return request({
    url: '/monitor/logininfor/' + infoId,
    method: 'delete'
  })
}

// 解锁用户登录状态
export function unlockLogininfor(userName: params): Promise<any> {
  return request({
    url: '/monitor/logininfor/unlock/' + userName,
    method: 'get'
  })
}

// 清空登录日志
export function cleanLogininfor(): Promise<any> {
  return request({
    url: '/monitor/logininfor/clean',
    method: 'delete'
  })
}
