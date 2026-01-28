/** 在线用户分页查询参数 */
export interface OnlineQueryParams {
  /** 登录地址 */
  ipaddr?: string;
  /** 用户名称 */
  userName?: string;
}

/** 在线用户信息 */
export interface SysUserOnline {
  /** 会话编号 */
  tokenId?: string;
  /** 部门名称 */
  deptName?: string;
  /** 用户名称 */
  userName?: string;
  /** 登录IP */
  ipaddr?: string;
  /** 登录地址 */
  loginLocation?: string;
  /** 浏览器类型 */
  browser?: string;
  /** 操作系统 */
  os?: string;
  /** 登录时间 */
  loginTime?: number;
}
