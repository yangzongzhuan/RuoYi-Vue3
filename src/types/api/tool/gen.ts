import type { PageDomain, BaseEntity } from "../common";

/** 数据表分页查询参数 */
export interface GenQueryParams extends PageDomain {
  /** 表名称 */
  tableName?: string;
  /** 表描述 */
  tableComment?: string;
  /** 创建时间 */
  params?: {
    beginTime?: string;
    endTime?: string;
  };
}

/** 代码生成业务信息 */
export interface GenTable extends BaseEntity {
  /** 主键编号 */
  tableId?: number;
  /** 表名称 */
  tableName?: string;
  /** 表描述 */
  tableComment?: string;
  /** 关联父表的表名 */
  subTableName?: string;
  /** 本表关联父表的外键名 */
  subTableFkName?: string;
  /** 实体类名称(首字母大写) */
  className?: string;
  /** 使用的模板（crud单表操作 tree树表操作 sub主子表操作） */
  tplCategory?: 'crud' | 'tree' | 'sub'
  /** 前端类型（element-ui模版 element-plus模版） */
  tplWebType?: 'element-ui' | 'element-plus'
  /** 生成包路径 */
  packageName?: string;
  /** 生成模块名 */
  moduleName?: string;
  /** 生成业务名 */
  businessName?: string;
  /** 生成功能名 */
  functionName?: string;
  /** 生成作者 */
  functionAuthor?: string;
  /** 生成代码方式（0zip压缩包 1自定义路径） */
  genType?: '0' | '1'
  /** 生成路径（不填默认项目路径） */
  genPath?: string;
   /** 其它生成选项 */
   options?: string;
  /** 树编码字段  */
  treeCode?: string;
  /** 树父编码字段 */
  treeParentCode?: string;
  /** 树名称字段 */
  treeName?: string;
  /** 上级菜单ID字段 */
  parentMenuId?: string;
  /** 上级菜单名称字段 */
  parentMenuName?: string;
  /** 表列信息 */
  columns?: GenTableColumn[]
}

/** 生成表列字段信息 */
export interface GenTableColumn extends BaseEntity {
  /** 主键编号 */
  columnId?: number
  /** 归属表编号 */
  tableId?: number
  /** 列名称 */
  columnName?: string
  /** 列描述 */
  columnComment?: string
  /** 列类型 */
  columnType?: string
  /** Java类型 */
  javaType?: string
  /** Java字段名 */
  javaField?: string
  /** 是否主键（1是） */
  isPk?: '1' | '0'
  /** 是否自增（1是） */
  isIncrement?: '1' | '0'
  /** 是否必填（1是） */
  isRequired?: '1' | '0'
  /** 是否为插入字段（1是） */
  isInsert?: '1' | '0'
  /** 是否编辑字段（1是） */
  isEdit?: '1' | '0'
  /** 是否列表字段（1是） */
  isList?: '1' | '0'
  /** 是否查询字段（1是） */
  isQuery?: '1' | '0'
  /** 查询方式（EQ等于、NE不等于、GT大于、LT小于、LIKE模糊、BETWEEN范围） */
  queryType?: 'EQ' | 'NE' | 'GT' | 'LT' | 'LIKE' | 'BETWEEN'
  /** 显示类型（input文本框、textarea文本域、select下拉框、checkbox复选框、radio单选框、datetime日期控件、image图片上传控件、upload文件上传控件、editor富文本控件） */
  htmlType?: string
  /** 字典类型 */
  dictType?: string
  /** 排序 */
  sort?: number
}

/** 代码生成信息响应 */
export interface GenTableInfoResult {
  /** 表信息 */
  info: GenTable
  /** 列信息列表 */
  rows: GenTableColumn[]
  /** 所有表信息 */
  tables: GenTable[]
}
