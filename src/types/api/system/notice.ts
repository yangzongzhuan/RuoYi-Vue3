import type { PageDomain, BaseEntity } from "../common";

/** 通知公告分页查询参数 */
export interface NoticeQueryParams extends PageDomain  {
  /** 公告标题 */
  noticeTitle?: string;
  /** 操作人员 */
  createBy?: string;
  /** 公告类型 */
  noticeType?: string;
}

/** 通知公告信息 */
export interface SysNotice extends BaseEntity {
  /** 公告编号 */
  noticeId?: number;
  /** 公告标题 */
  noticeTitle?: string;
  /** 公告类型（1通知 2公告） */
  noticeType?: '1' | '2';
  /** 公告内容 */
  noticeContent?: string;
  /** 状态（0正常 1停用） */
  status?: '0' | '1';
}
