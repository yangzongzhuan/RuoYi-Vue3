<template>
  <div class="header-search">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <el-dialog
      v-model="show"
      width="600"
      @close="close"
      :show-close="false"
      append-to-body
    >
      <el-input
        v-model="search"
        ref="headerSearchSelectRef"
        size="large"
        @input="querySearch"
        prefix-icon="Search"
        placeholder="菜单搜索，支持标题、URL模糊查询"
        clearable
        @keyup.enter="selectActiveResult"
        @keydown.up.prevent="navigateResult('up')"
        @keydown.down.prevent="navigateResult('down')"
      >
      </el-input>

      <div class="result-wrap">
        <el-scrollbar>
          <div class="search-item" tabindex="1" v-for="(item, index) in options" :key="item.path" :style="activeStyle(index)" @mouseenter="activeIndex = index" @mouseleave="activeIndex = -1">
            <div class="left">
              <svg-icon class="menu-icon" :icon-class="item.icon" />
            </div>
            <div class="search-info" @click="change(item)">
              <div class="menu-title">
                {{ item.title.join(" / ") }}
              </div>
              <div class="menu-path">
                {{ item.path }}
              </div>
            </div>
            <svg-icon icon-class="enter" v-show="index === activeIndex"/>
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import Fuse from 'fuse.js'
import { getNormalPath } from '@/utils/ruoyi'
import { isHttp } from '@/utils/validate'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'

const search = ref('')
const options = ref([])
const searchPool = ref([])
const activeIndex = ref(-1)
const show = ref(false)
const fuse = ref(undefined)
const headerSearchSelectRef = ref(null)
const router = useRouter()
const theme = computed(() => useSettingsStore().theme)
const routes = computed(() => usePermissionStore().defaultRoutes)

function click() {
  show.value = !show.value
  if (show.value) {
    headerSearchSelectRef.value && headerSearchSelectRef.value.focus()
    options.value = searchPool.value
  }
}

function close() {
  headerSearchSelectRef.value && headerSearchSelectRef.value.blur()
  search.value = ''
  options.value = []
  show.value = false
  activeIndex.value = -1
}

function change(val) {
  const path = val.path
  const query = val.query
  if (isHttp(path)) {
    // http(s):// 路径新窗口打开
    const pindex = path.indexOf("http")
    window.open(path.substr(pindex, path.length), "_blank")
  } else {
    if (query) {
      router.push({ path: path, query: JSON.parse(query) })
    } else {
      router.push(path)
    }
  }

  search.value = ''
  options.value = []
  nextTick(() => {
    show.value = false
  })
}

function initFuse(list) {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [{
      name: 'title',
      weight: 0.7
    }, {
      name: 'path',
      weight: 0.3
    }]
  })
}

// Filter out the routes that can be displayed in the sidebar
// And generate the internationalized title
function generateRoutes(routes, basePath = '', prefixTitle = []) {
  let res = []

  for (const r of routes) {
    // skip hidden router
    if (r.hidden) { continue }
    const p = r.path.length > 0 && r.path[0] === '/' ? r.path : '/' + r.path
    const data = {
      path: !isHttp(r.path) ? getNormalPath(basePath + p) : r.path,
      title: [...prefixTitle],
      icon: ''
    }

    if (r.meta && r.meta.title) {
      data.title = [...data.title, r.meta.title]
      data.icon = r.meta.icon
      if (r.redirect !== "noRedirect") {
        // only push the routes with title
        // special case: need to exclude parent router without redirect
        res.push(data)
      }
    }
    if (r.query) {
      data.query = r.query
    }

    // recursive child routes
    if (r.children) {
      const tempRoutes = generateRoutes(r.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}

function querySearch(query) {
  activeIndex.value = -1
  if (query !== '') {
    options.value = fuse.value.search(query).map((item) => item.item) ?? searchPool.value
  } else {
    options.value = searchPool.value
  }
}

function activeStyle(index) {
  if (index !== activeIndex.value) return {}
  return {
    "background-color": theme.value,
    "color": "#fff"
  }
}

function navigateResult(direction) {
  if (direction === "up") {
    activeIndex.value = activeIndex.value <= 0 ? options.value.length - 1 : activeIndex.value - 1
  } else if (direction === "down") {
    activeIndex.value = activeIndex.value >= options.value.length - 1 ? 0 : activeIndex.value + 1
  }
}

function selectActiveResult() {
  if (options.value.length > 0 && activeIndex.value >= 0) {
    change(options.value[activeIndex.value])
  }
}

onMounted(() => {
  searchPool.value = generateRoutes(routes.value)
})

watch(searchPool, (list) => {
  initFuse(list)
})
</script>

<style lang='scss' scoped>
.header-search {
  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
}

.result-wrap {	
  height: 280px;
  margin: 6px 0;

  .search-item {
    display: flex;
    height: 48px;
    align-items: center;
    padding-right: 10px;

    .left {
      width: 60px;
      text-align: center;

      .menu-icon {
        width: 18px;
        height: 18px;
      }
    }

    .search-info {
      padding-left: 5px;
      margin-top: 10px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      flex: 1;

      .menu-title,
      .menu-path {
        height: 20px;
      }
      .menu-path {
        color: #ccc;
        font-size: 10px;
      }
    }
  }

  .search-item:hover {
    cursor: pointer;
  }
}
</style>
