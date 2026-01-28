import request from '@/utils/request'
import type { JobQueryParams, SysJob, AjaxResult, TableDataInfo } from '@/types'

// 查询定时任务调度列表
export function listJob(query: JobQueryParams): Promise<TableDataInfo<SysJob[]>> {
  return request({
    url: '/monitor/job/list',
    method: 'get',
    params: query
  })
}

// 查询定时任务调度详细
export function getJob(jobId: number): Promise<AjaxResult<SysJob>> {
  return request({
    url: '/monitor/job/' + jobId,
    method: 'get'
  })
}

// 新增定时任务调度
export function addJob(data: SysJob): Promise<AjaxResult> {
  return request({
    url: '/monitor/job',
    method: 'post',
    data: data
  })
}

// 修改定时任务调度
export function updateJob(data: SysJob): Promise<AjaxResult> {
  return request({
    url: '/monitor/job',
    method: 'put',
    data: data
  })
}

// 删除定时任务调度
export function delJob(jobId: number | number[]): Promise<AjaxResult> {
  return request({
    url: '/monitor/job/' + jobId,
    method: 'delete'
  })
}

// 任务状态修改
export function changeJobStatus(jobId: number, status: string): Promise<AjaxResult> {
  const data = {
    jobId,
    status
  }
  return request({
    url: '/monitor/job/changeStatus',
    method: 'put',
    data: data
  })
}

// 定时任务立即执行一次
export function runJob(jobId: number, jobGroup: string): Promise<AjaxResult> {
  const data = {
    jobId,
    jobGroup
  }
  return request({
    url: '/monitor/job/run',
    method: 'put',
    data: data
  })
}
