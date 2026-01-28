import type { PageDomain, BaseEntity } from "../common";

/** 岗位分页查询参数 */
export interface PostQueryParams extends PageDomain {
  /** 岗位编码 */
  postCode?: string;
  /** 岗位名称 */
  postName?: string;
  /** 状态 */
  status?: string;
}

/** 岗位信息 */
export interface SysPost extends BaseEntity {
  /** 岗位编号 */
  postId?: number;
  /** 岗位编码 */
  postCode?: string;
  /** 岗位名称 */
  postName?: string;
  /** 岗位排序 */
  postSort?: number;
  /** 状态（0正常 1停用） */
  status?: '0' | '1';
}
