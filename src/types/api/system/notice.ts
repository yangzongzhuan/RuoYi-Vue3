import type { PageDomain, BaseEntity, AjaxResult } from "../common";

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
  /** 是否已读 */
  isRead: boolean;
}

export interface SysNoticeTopResult extends AjaxResult<SysNotice[]> {
  unreadCount: number
}

/** 公告已读用户查询参数 */
export interface NoticeReadUserQueryParams extends PageDomain {
  /** 公告编号 */
  noticeId?: number
  /** 关键字（登录名/用户名） */
  searchValue?: string
}

/** 公告已读用户 */
export interface NoticeReadUser {
  userId?: number
  userName?: string
  nickName?: string
  deptName?: string
  phonenumber?: string
  readTime?: string
}
