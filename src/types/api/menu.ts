/** 路由信息 */
export interface RouterVo {
  /** 路由名字 */
  name?: string;
  /** 路由地址 */
  path?: string;
  /** 是否隐藏路由，当设置 true 的时候该路由不会再侧边栏出现 */
  hidden?: boolean;
  /** 重定向地址，当设置 noRedirect 的时候该路由在面包屑导航中不可被点击 */
  redirect?: string;
  /** 组件地址 */
  component?: string;
  /** 路由参数：如 {"id": 1, "name": "ry"} */
  query?: string;
  /** 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面 */
  alwaysShow?: boolean;
  /** 其他元素 */
  meta?: MetaVo;
  /** 子路由 */
  children?: RouterVo[]
}

/** 路由其他元素信息 */
export interface MetaVo {
  /** 设置该路由在侧边栏和面包屑中展示的名字 */
  title?: string
  /** 设置该路由的图标，对应路径src/assets/icons/svg */
  icon?: string
  /** 设置为true，则不会被 <keep-alive>缓存 */
  noCache?: boolean
  /** 内链地址（http(s)://开头） */
  link?: string
}
