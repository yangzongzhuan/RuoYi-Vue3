import request from '@/utils/request'

type params = string | number | null | undefined

// 查询调度日志列表
export function listJobLog(query: any): Promise<any> {
  return request({
    url: '/monitor/jobLog/list',
    method: 'get',
    params: query
  })
}

// 删除调度日志
export function delJobLog(jobLogId: any): Promise<any> {
  return request({
    url: '/monitor/jobLog/' + jobLogId,
    method: 'delete'
  })
}

// 清空调度日志
export function cleanJobLog(): Promise<any> {
  return request({
    url: '/monitor/jobLog/clean',
    method: 'delete'
  })
}
