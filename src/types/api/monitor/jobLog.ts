import type { PageDomain, BaseEntity } from "../common";

/** 定时任务日志分页查询参数 */
export interface JobLogQueryParams extends PageDomain {
  /** 任务名称 */
  jobName?: string;
  /** 任务组名 */
  jobGroup?: string;
  /** 执行状态 */
  status?: string;
  /** 执行时间 */
  params?: {
    beginTime?: string;
    endTime?: string;
  };
}

/** 定时任务日志信息 */
export interface SysJobLog extends BaseEntity {
  /** 任务日志编号 */
  jobLogId?: number;
  /** 任务名称 */
  jobName?: string;
  /** 任务组名 */
  jobGroup?: string;
  /** 调用目标字符串 */
  invokeTarget?: string;
  /** 日志信息 */
  jobMessage?: string;
  /** 异常信息 */
  exceptionInfo?: string;
  /** 状态（0正常 1失败） */
  status?: '0' | '1';
}
