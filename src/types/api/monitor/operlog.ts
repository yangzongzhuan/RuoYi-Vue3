import type { PageDomain, BaseEntity } from "../common";

/** 操作日志分页查询参数 */
export interface OperlogQueryParams extends PageDomain {
  /** 操作地址 */
  operIp?: string;
  /** 系统模块 */
  title?: string;
  /** 操作人员 */
  operName?: string;
  /** 类型 */
  businessType?: number;
  /** 状态 */
  status?: string;
  /** 登录时间 */
  params?: {
    beginTime?: string;
    endTime?: string;
  };
}

/** 操作日志信息 */
export interface SysOperLog extends BaseEntity {
  /** 操作日志编号 */
  operId?: number;
  /** 操作模块 */
  title?: string;
  /** 业务类型（0=其它,1=新增,2=修改,3=删除,4=授权,5=导出,6=导入,7=强退,8=生成代码,9=清空数据） */
  businessType?: number;
  /** 请求方法 */
  method?: string;
  /** 请求方式 */
  requestMethod?: string;
  /** 操作类别 */
  operatorType?: string;
  /** 操作人员 */
  operName?: string;
  /** 部门名称 */
  deptName?: string;
  /** 请求地址 */
  operUrl?: string;
  /** 操作地址 */
  operIp?: string;
  /** 操作地点 */
  operLocation?: string;
  /** 请求参数 */
  operParam?: string;
  /** 返回参数 */
  jsonResult?: string;
  /** 错误消息 */
  errorMsg?: string;
  /** 操作时间 */
  operTime?: Date;
  /** 消耗时间 */
  costTime?: number;
  /** 状态（0正常 1异常） */
  status?: '0' | '1';
}
