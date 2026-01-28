import type { BaseEntity, AjaxResult, TreeSelect } from "../common";

/** 菜单查询参数 */
export interface MenuQueryParams {
  /** 菜单名称 */
  menuName?: string;
  /** 状态 */
  status?: string;
}

/** 菜单信息 */
export interface SysMenu extends BaseEntity {
  /** 菜单编号 */
  menuId?: number;
  /** 父菜单ID */
  parentId?: number;
  /** 菜单名称 */
  menuName?: string;
  /** 显示顺序 */
  orderNum?: number;
  /** 路由地址 */
  path?: string;
  /** 组件路径 */
  component?: string;
  /** 路由参数 */
  query?: string;
  /** 路由名称 */
  routeName?: string;
  /** 权限字符串 */
  perms?: string;
  /** 菜单图标 */
  icon?: string;
  /** 是否为外链（0是 1否） */
  isFrame?: '0' | '1';
  /** 是否缓存（0缓存 1不缓存） */
  isCache?: '0' | '1';
  /** 类型（M目录 C菜单 F按钮） */
  menuType?: 'M' | 'C' | 'F';
  /** 显示状态（0显示 1隐藏） */
  visible?: '0' | '1';
  /** 状态（0正常 1停用） */
  status?: '0' | '1';
}

export interface RoleMenuTreeselectResult extends AjaxResult {
  /** 已选中的菜单ID列表 */
  checkedKeys: number[]
  /** 菜单树形结构 */
  menus: TreeSelect[]
}
