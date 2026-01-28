import request from '@/utils/request'
import type { MenuQueryParams, SysMenu, TreeSelect, AjaxResult, RoleMenuTreeselectResult } from '@/types'

// 查询菜单列表
export function listMenu(query?: MenuQueryParams): Promise<AjaxResult<SysMenu[]>> {
  return request({
    url: '/system/menu/list',
    method: 'get',
    params: query
  })
}

// 查询菜单详细
export function getMenu(menuId: number): Promise<AjaxResult<SysMenu>> {
  return request({
    url: '/system/menu/' + menuId,
    method: 'get'
  })
}

// 查询菜单下拉树结构
export function treeselect(): Promise<AjaxResult<TreeSelect[]>> {
  return request({
    url: '/system/menu/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构
export function roleMenuTreeselect(roleId: number): Promise<RoleMenuTreeselectResult> {
  return request({
    url: '/system/menu/roleMenuTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增菜单
export function addMenu(data: SysMenu): Promise<AjaxResult> {
  return request({
    url: '/system/menu',
    method: 'post',
    data: data
  })
}

// 修改菜单
export function updateMenu(data: SysMenu): Promise<AjaxResult> {
  return request({
    url: '/system/menu',
    method: 'put',
    data: data
  })
}

// 删除菜单
export function delMenu(menuId: number): Promise<AjaxResult> {
  return request({
    url: '/system/menu/' + menuId,
    method: 'delete'
  })
}
