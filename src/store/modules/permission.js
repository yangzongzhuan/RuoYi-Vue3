import { constantRoutes } from "@/router";
import Layout from "@/layout/index";
import ParentView from "@/components/ParentView";
import InnerLink from "@/layout/components/InnerLink";
import { LOCAL_ROUTES } from "@/router/index.js";

const modules = import.meta.glob("./../../views/**/*.vue");
// 注释掉默认的定义的菜单，然后统一从router/index.js中引入
// const LOCAL_ROUTES = [
//   {
//     name: "System",
//     path: "/system",
//     hidden: false,
//     redirect: "noRedirect",
//     component: "Layout",
//     meta: { title: "系统管理", icon: "system", roles: ["admin"] },
//     children: [
//       {
//         path: "user",
//         component: "system/user/index",
//         hidden: false,
//         meta: { title: "用户管理", icon: "user", roles: ["admin"] },
//       },
//       {
//         path: "role",
//         component: "system/role/index",
//         hidden: false,
//         meta: { title: "角色管理", icon: "peoples", roles: ["admin"] },
//       },
//       {
//         path: "menu",
//         component: "system/menu/index",
//         hidden: false,
//         meta: { title: "菜单管理", icon: "tree", roles: ["admin"] },
//       },
//       {
//         path: "dept",
//         component: "system/dept/index",
//         hidden: false,
//         meta: { title: "部门管理", icon: "dept", roles: ["admin"] },
//       },
//       {
//         path: "post",
//         component: "system/post/index",
//         hidden: false,
//         meta: { title: "岗位管理", icon: "post", roles: ["admin"] },
//       },
//       {
//         path: "dict",
//         component: "system/dict/index",
//         hidden: false,
//         meta: { title: "字典管理", icon: "dict", roles: ["admin"] },
//       },
//       {
//         path: "config",
//         component: "system/config/index",
//         hidden: false,
//         meta: { title: "参数管理", icon: "edit", roles: ["admin"] },
//       },
//       {
//         path: "notice",
//         component: "system/notice/index",
//         hidden: false,
//         meta: { title: "通知公告", icon: "message", roles: ["admin"] },
//       },
//     ],
//   },
//   {
//     name: "Monitor",
//     path: "/monitor",
//     hidden: false,
//     redirect: "noRedirect",
//     component: "Layout",
//     meta: { title: "系统监控", icon: "monitor", roles: ["admin"] },
//     children: [
//       {
//         path: "online",
//         component: "monitor/online/index",
//         hidden: false,
//         meta: { title: "在线用户", icon: "online", roles: ["admin"] },
//       },
//       {
//         path: "job",
//         component: "monitor/job/index",
//         hidden: false,
//         meta: { title: "定时任务", icon: "job", roles: ["admin"] },
//       },
//       {
//         path: "druid",
//         component: "monitor/druid/index",
//         hidden: false,
//         meta: { title: "数据监控", icon: "druid", roles: ["admin"] },
//       },
//       {
//         path: "server",
//         component: "monitor/server/index",
//         hidden: false,
//         meta: { title: "服务器监控", icon: "server", roles: ["admin"] },
//       },
//       {
//         path: "cache",
//         component: "monitor/cache/index",
//         hidden: false,
//         meta: { title: "缓存监控", icon: "redis", roles: ["admin"] },
//       },
//       {
//         path: "logininfor",
//         component: "monitor/logininfor/index",
//         hidden: false,
//         meta: { title: "登录日志", icon: "logininfor", roles: ["admin"] },
//       },
//       {
//         path: "operlog",
//         component: "monitor/operlog/index",
//         hidden: false,
//         meta: { title: "操作日志", icon: "operlog", roles: ["admin"] },
//       },
//     ],
//   },
//   {
//     name: "Tool",
//     path: "/tool",
//     hidden: false,
//     redirect: "noRedirect",
//     component: "Layout",
//     meta: { title: "系统工具", icon: "tool", roles: ["admin"] },
//     children: [
//       {
//         path: "build",
//         component: "tool/build/index",
//         hidden: false,
//         meta: { title: "表单构建", icon: "build", roles: ["admin"] },
//       },
//       {
//         path: "gen",
//         component: "tool/gen/index",
//         hidden: false,
//         meta: { title: "代码生成", icon: "code", roles: ["admin"] },
//       },
//       {
//         path: "swagger",
//         component: "tool/swagger/index",
//         hidden: false,
//         meta: { title: "系统接口", icon: "swagger", roles: ["admin"] },
//       },
//     ],
//   },
// ];

const usePermissionStore = defineStore("permission", {
  state: () => ({
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: [],
  }),
  actions: {
    setRoutes(routes) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(routes);
    },
    setDefaultRoutes(routes) {
      this.defaultRoutes = constantRoutes.concat(routes);
    },
    setTopbarRoutes(routes) {
      this.topbarRouters = routes;
    },
    setSidebarRouters(routes) {
      this.sidebarRouters = routes;
    },
    generateRoutes() {
      return new Promise((resolve) => {
        const sdata = JSON.parse(JSON.stringify(LOCAL_ROUTES));
        const rdata = JSON.parse(JSON.stringify(LOCAL_ROUTES));
        const defaultData = JSON.parse(JSON.stringify(LOCAL_ROUTES));
        const sidebarRoutes = filterAsyncRouter(sdata);
        const rewriteRoutes = filterAsyncRouter(rdata, false, true);
        const defaultRoutes = filterAsyncRouter(defaultData);
        this.setRoutes(rewriteRoutes);
        this.setSidebarRouters(constantRoutes.concat(sidebarRoutes));
        this.setDefaultRoutes(sidebarRoutes);
        this.setTopbarRoutes(defaultRoutes);
        resolve(rewriteRoutes);
      });
    },
  },
});

function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children);
    }
    if (route.component) {
      if (route.component === "Layout") {
        route.component = Layout;
      } else if (route.component === "ParentView") {
        route.component = ParentView;
      } else if (route.component === "InnerLink") {
        route.component = InnerLink;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type);
    } else {
      delete route["children"];
      delete route["redirect"];
    }
    return true;
  });
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = [];
  childrenMap.forEach((el) => {
    el.path = lastRouter ? lastRouter.path + "/" + el.path : el.path;
    if (el.children && el.children.length && el.component === "ParentView") {
      children = children.concat(filterChildren(el.children, el));
    } else {
      children.push(el);
    }
  });
  return children;
}

// export function filterDynamicRoutes(routes) {
//   const res = []
//   routes.forEach(route => {
//     if (route.permissions) {
//       if (auth.hasPermiOr(route.permissions)) {
//         res.push(route)
//       }
//     } else if (route.roles) {
//       if (auth.hasRoleOr(route.roles)) {
//         res.push(route)
//       }
//     }
//   })
//   return res
// }

export const loadView = (view) => {
  let res;
  for (const path in modules) {
    const dir = path.split("views/")[1].split(".vue")[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
};

export default usePermissionStore;
