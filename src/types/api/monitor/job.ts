import type { PageDomain, BaseEntity } from "../common";

/** 定时任务分页查询参数 */
export interface JobQueryParams extends PageDomain {
  /** 任务名称 */
  jobName?: string;
  /** 任务组名 */
  jobGroup?: string;
  /** 任务状态 */
  status?: string;
}

/** 定时任务信息 */
export interface SysJob extends BaseEntity {
  /** 任务编号 */
  jobId?: number;
  /** 任务名称 */
  jobName?: string;
  /** 任务组名 */
  jobGroup?: string;
  /** 调用目标字符串 */
  invokeTarget?: string;
  /** 执行表达式 */
  cronExpression?: string;
  /** 下次执行时间 */
  nextValidTime?: Date;
  /** 计划策略 */
  misfirePolicy?: '1' | '2' | '3';
  /** 并发执行（0允许 1禁止） */
  concurrent?: '0' | '1';
  /** 状态（0正常 1暂停） */
  status?: '0' | '1';
}
