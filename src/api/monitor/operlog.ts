import request from '@/utils/request'

type params = string | number | null | undefined

// 查询操作日志列表
export function list(query : any): Promise<any> {
  return request({
    url: '/monitor/operlog/list',
    method: 'get',
    params: query
  })
}

// 删除操作日志
export function delOperlog(operId: params): Promise<any> {
  return request({
    url: '/monitor/operlog/' + operId,
    method: 'delete'
  })
}

// 清空操作日志
export function cleanOperlog() : Promise<any>{
  return request({
    url: '/monitor/operlog/clean',
    method: 'delete'
  })
}
