<template>
  <div v-if="!sidebarRouterItem.hidden">
    <template
      v-if="hasOneShowingChild(sidebarRouterItem.children, sidebarRouterItem)
        && (!onlyOneChild.children || onlyOneChild.noShowingChildren)
        && !sidebarRouterItem.alwaysShow"
    >
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <svg-icon
            v-if="onlyOneChild.meta?.icon || (sidebarRouterItem.meta && sidebarRouterItem.meta.icon)"
            :icon-class="onlyOneChild.meta?.icon || (sidebarRouterItem.meta && sidebarRouterItem.meta.icon)"
          />
          <template #title>
            <!--  -->
            <span
              class="menu-title"
              :style="
                onlyOneChild.meta?.icon
                  || (sidebarRouterItem.meta && sidebarRouterItem.meta.icon)
                  ? 'margin-left: 10px;'
                  : 'margin-left: 4px;'
              "
              :title="hasTitle(onlyOneChild.meta.title)"
            >{{ onlyOneChild.meta.title }}</span>
          </template>
        </el-menu-item>
      </AppLink>
    </template>

    <el-sub-menu v-else :index="resolvePath(sidebarRouterItem.path)" teleported>
      <template v-if="sidebarRouterItem.meta" #title>
        <svg-icon :icon-class="sidebarRouterItem.meta && sidebarRouterItem.meta.icon" />
        <span
          class="menu-title"
          style=" margin-left: 10px;"
          :title="hasTitle(sidebarRouterItem.meta.title)"
        >{{ sidebarRouterItem.meta.title }}</span>
      </template>

      <sidebar-item
        v-for="(child, index) in item.children"
        :key="child.path + index"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
import { getNormalPath } from '@/utils/ruoyi'
import { isExternal } from '@/utils/validate'
import AppLink from './Link'

const props = defineProps({
  // route object
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: '',
  },
})

let sidebarRouterItem = computed(() => {
  const newIconMetaOption = iconFormat(props.item)

  return {
    ...props.item,
    ...newIconMetaOption,
  }
})

const onlyOneChild = ref({})

function hasOneShowingChild(children = [], parent) {
  if (!children) {
    children = []
  }
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    }
    const newIconMetaOption = iconFormat(item)
    onlyOneChild.value = {
      ...item,
      ...newIconMetaOption,
    }
    return true
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    const metaOptionFormat = iconFormat(parent)
    onlyOneChild.value = {
      ...parent,
      ...metaOptionFormat,
      path: '',
      noShowingChildren: true,
    }
    return true
  }

  return false
}

function resolvePath(routePath, routeQuery) {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  if (routeQuery) {
    const query = JSON.parse(routeQuery)
    return { path: getNormalPath(`${props.basePath}/${routePath}`), query }
  }
  return getNormalPath(`${props.basePath}/${routePath}`)
}

function hasTitle(title) {
  if (title.length > 5) {
    return title
  }
  else {
    return ''
  }
}

function iconFormat(item) {
  let flag = {}
  if (item.meta && item.meta.icon == '#') {
    flag.meta = {
      ...item.meta,
      icon: '',
    }
  }
  return flag
}
</script>
