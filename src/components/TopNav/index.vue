<template>
  <el-menu :default-active="activeMenu" mode="horizontal" :ellipsis="false" @select="handleSelect">
    <template v-for="(item, index) in topMenus">
      <el-menu-item v-if="index < Number(visibleNumber)" :key="index" :style="{ '--theme': theme }" :index="item.path"
        ><svg-icon :icon-class="item.meta?.icon" /> {{ item.meta?.title }}</el-menu-item
      >
    </template>

    <!-- 顶部菜单超出数量折叠 -->
    <el-sub-menu v-if="topMenus.length > Number(visibleNumber)" :style="{ '--theme': theme }" index="more">
      <template #title>更多菜单</template>
      <template v-for="(item, index) in topMenus">
        <el-menu-item v-if="index >= Number(visibleNumber)" :key="index" :index="item.path"
          ><svg-icon :icon-class="item.meta!.icon" /> {{ item.meta!.title }}</el-menu-item
        >
      </template>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import { constantRoutes } from '@/router'
import { isHttp } from '@/utils/validate'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router'

// 顶部栏初始数
const visibleNumber = ref<number | null>(null)
// 当前激活菜单的 index
const currentIndex = ref(null)
// 隐藏侧边栏路由
const hideList = ['/index', '/user/profile']

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()
const route = useRoute()
const router = useRouter()

// 主题颜色
const theme = computed(() => settingsStore.theme)
// 所有的路由信息
const routers = computed(() => permissionStore.topbarRouters)

// 顶部显示菜单
const topMenus = computed(() => {
  let topMenus: RouteRecordRaw[] = []
  routers.value.map((menu: any) => {
    if (menu.hidden !== true) {
      // 兼容顶部栏一级菜单内部跳转
      if (menu.path === '/') {
        menu.children?.[0] && topMenus.push(menu.children?.[0])
      } else {
        topMenus.push(menu)
      }
    }
  })
  return topMenus
})

// 设置子路由
const childrenMenus = computed(() => {
  let childrenMenus: RouteRecordRaw[] = []
  routers.value.map(router => {
    for (let item in router.children) {
      if (router.children[item as any].parentPath === undefined) {
        if (router.path === '/') {
          router.children[item as any].path = '/' + router.children[item as any].path
        } else {
          if (!isHttp(router.children[item as any].path)) {
            router.children[item as any].path = router.path + '/' + router.children[item as any].path
          }
        }
        router.children[item as any].parentPath = router.path
      }
      childrenMenus.push(router.children[item as any])
    }
  })
  return constantRoutes.concat(childrenMenus)
})

// 默认激活的菜单
const activeMenu = computed(() => {
  const path = route.path
  let activePath = path
  if (path !== undefined && path.lastIndexOf('/') > 0 && hideList.indexOf(path) === -1) {
    const tmpPath = path.substring(1, path.length)
    activePath = '/' + tmpPath.substring(0, tmpPath.indexOf('/'))
    if (!route.meta.link) {
      appStore.toggleSideBarHide(false)
    }
  } else if (!(route as any).children) {
    activePath = path
    appStore.toggleSideBarHide(true)
  }
  activeRoutes(activePath)
  return activePath
})

function setVisibleNumber() {
  const width = document.body.getBoundingClientRect().width / 3
  visibleNumber.value = parseInt(String(width / 85))
}

function handleSelect(key: any, keyPath: any) {
  currentIndex.value = key
  const route = routers.value.find(item => item.path === key)
  if (isHttp(key)) {
    // http(s):// 路径新窗口打开
    window.open(key, '_blank')
  } else if (!route || !route.children) {
    // 没有子路由路径内部打开
    router.push({ path: key })
    appStore.toggleSideBarHide(true)
  } else {
    // 显示左侧联动菜单
    activeRoutes(key)
    appStore.toggleSideBarHide(false)
  }
}
function activeRoutes(key: any) {
  let routes: RouteRecordRaw[] = []
  if (childrenMenus.value && childrenMenus.value.length > 0) {
    childrenMenus.value.map((item: any) => {
      if (key === item.parentPath || (key === 'index' && '' === item.path)) {
        routes.push(item)
      }
    })
  }
  if (routes.length > 0) {
    permissionStore.setSidebarRouters(routes)
  } else {
    appStore.toggleSideBarHide(true)
  }
  return routes
}

onMounted(() => {
  window.addEventListener('resize', setVisibleNumber)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', setVisibleNumber)
})

onMounted(() => {
  setVisibleNumber()
})
</script>

<style lang="scss">
.topmenu-container.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 50px !important;
  line-height: 50px !important;
  color: #999093 !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}

.topmenu-container.el-menu--horizontal > .el-menu-item.is-active,
.el-menu--horizontal > .el-sub-menu.is-active .el-submenu__title {
  border-bottom: 2px solid #{'var(--theme)'} !important;
  color: #303133;
}

/* sub-menu item */
.topmenu-container.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  float: left;
  height: 50px !important;
  line-height: 50px !important;
  color: #999093 !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}
</style>
