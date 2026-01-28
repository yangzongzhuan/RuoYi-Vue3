import type { PageDomain, BaseEntity } from "../common";

/** 登录日志分页查询参数 */
export interface LogininforQueryParams extends PageDomain {
  /** 登录地址 */
  ipaddr?: string;
  /** 用户名称 */
  userName?: string;
  /** 状态 */
  status?: string;
  /** 登录时间 */
  params?: {
    beginTime?: string;
    endTime?: string;
  };
}

/** 登录日志信息 */
export interface SysLogininfor extends BaseEntity {
  /** 登录日志编号 */
  infoId?: number;
  /** 用户账号 */
  userName?: string;
  /** 登录地址 */
  ipaddr?: string;
  /** 登录地点 */
  loginLocation?: string;
  /** 浏览器 */
  browser?: string;
  /** 操作系统 */
  os?: string;
  /** 提示消息 */
  msg?: string;
  /** 访问时间 */
  loginTime?: Date;
  /** 状态（0正常 1失败） */
  status?: '0' | '1';
}
