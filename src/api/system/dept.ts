import request from '@/utils/request'

type params = string | number | null | undefined
// 查询部门列表
export function listDept(query?: any): Promise<any> {
  return request({
    url: '/system/dept/list',
    method: 'get',
    params: query
  })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId: params): Promise<any> {
  return request({
    url: '/system/dept/list/exclude/' + deptId,
    method: 'get'
  })
}

// 查询部门详细
export function getDept(deptId: params): Promise<any> {
  return request({
    url: '/system/dept/' + deptId,
    method: 'get'
  })
}

// 新增部门
export function addDept(data: any): Promise<any> {
  return request({
    url: '/system/dept',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data: any): Promise<any> {
  return request({
    url: '/system/dept',
    method: 'put',
    data: data
  })
}

// 删除部门
export function delDept(deptId: params): Promise<any> {
  return request({
    url: '/system/dept/' + deptId,
    method: 'delete'
  })
}
