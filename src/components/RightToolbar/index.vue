<template>
  <div class="top-right-btn" :style="style">
    <el-row>
      <el-tooltip class="item" effect="dark" :content="showSearch ? '隐藏搜索' : '显示搜索'" placement="top" v-if="search">
        <el-button circle icon="Search" @click="toggleSearch()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="刷新" placement="top">
        <el-button circle icon="Refresh" @click="refresh()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="显隐列" placement="top" v-if="Object.keys(columns).length > 0">
        <el-button circle icon="Menu" @click="showColumn()" v-if="showColumnsType == 'transfer'"/>
        <el-dropdown trigger="click" :hide-on-click="false" style="padding-left: 12px" v-if="showColumnsType == 'checkbox'">
          <el-button circle icon="Menu" />
          <template #dropdown>
            <el-dropdown-menu>
              <!-- 全选/反选 按钮 -->
              <el-dropdown-item>
                <el-checkbox :indeterminate="isIndeterminate" v-model="isChecked" @change="toggleCheckAll"> 列展示 </el-checkbox>
              </el-dropdown-item>
              <div class="check-line"></div>
              <template v-for="(item, key) in columns" :key="item.key">
                <el-dropdown-item>
                  <el-checkbox v-model="item.visible" @change="checkboxChange($event, key)" :label="item.label" />
                </el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-tooltip>
    </el-row>
    <el-dialog :title="title" v-model="open" append-to-body>
      <el-transfer
        :titles="['显示', '隐藏']"
        v-model="value"
        :data="transferData"
        @change="dataChange"
      ></el-transfer>
    </el-dialog>
  </div>
</template>

<script setup>
import cache from '@/plugins/cache'

const props = defineProps({
  /* 是否显示检索条件 */
  showSearch: {
    type: Boolean,
    default: true
  },
  /* 显隐列信息（数组格式、对象格式） */
  columns: {
    type: [Array, Object],
    default: () => ({})
  },
  /* 是否显示检索图标 */
  search: {
    type: Boolean,
    default: true
  },
  /* 显隐列类型（transfer穿梭框、checkbox复选框） */
  showColumnsType: {
    type: String,
    default: "checkbox"
  },
  /* 右外边距 */
  gutter: {
    type: Number,
    default: 10
  },
  /* 列显隐状态记忆的 localStorage key（传入则启用记忆，不传则不记忆） */
  storageKey: {
    type: String,
    default: ""
  }
})

const emits = defineEmits(['update:showSearch', 'queryTable'])

// 显隐数据
const value = ref([])
// 弹出层标题
const title = ref("显示/隐藏")
// 是否显示弹出层
const open = ref(false)

const style = computed(() => {
  const ret = {}
  if (props.gutter) {
    ret.marginRight = `${props.gutter / 2}px`
  }
  return ret
})

// 是否全选/半选 状态
const isChecked = computed({
  get: () => Array.isArray(props.columns) ? props.columns.every(col => col.visible) : Object.values(props.columns).every((col) => col.visible),
  set: () => {}
})
const isIndeterminate = computed(() => Array.isArray(props.columns) ? props.columns.some((col) => col.visible) && !isChecked.value : Object.values(props.columns).some((col) => col.visible) && !isChecked.value)
const transferData = computed(() => Array.isArray(props.columns) ? props.columns.map((item, index) => ({ key: index, label: item.label })) : Object.keys(props.columns).map((key, index) => ({ key: index, label: props.columns[key].label })))

// 搜索
const { proxy } = getCurrentInstance()
function toggleSearch() {
  let el = proxy.$el
  let formEl = null
  while ((el = el.parentElement) && el !== document.body) {
    if ((formEl = el.querySelector('.el-form'))) break
  }
  if (!formEl) return emits('update:showSearch', !props.showSearch)
  animateSearch(formEl, props.showSearch)
}
function animateSearch(el, isHide) {
  const DURATION = 260
  const TRANSITION = 'max-height 0.25s ease, opacity 0.2s ease'
  const clear = () => Object.assign(el.style, { transition: '', maxHeight: '', opacity: '', overflow: '' })
  Object.assign(el.style, { overflow: 'hidden', transition: '' })
  if (isHide) {
    Object.assign(el.style, { maxHeight: el.scrollHeight + 'px', opacity: '1', transition: TRANSITION })
    requestAnimationFrame(() => Object.assign(el.style, { maxHeight: '0', opacity: '0' }))
    setTimeout(() => { emits('update:showSearch', false); clear() }, DURATION)
  } else {
    emits('update:showSearch', true)
    nextTick(() => {
      Object.assign(el.style, { maxHeight: '0', opacity: '0' })
      requestAnimationFrame(() => requestAnimationFrame(() => {
        Object.assign(el.style, { transition: TRANSITION, maxHeight: el.scrollHeight + 'px', opacity: '1' })
      }))
      setTimeout(clear, DURATION)
    })
  }
}

// 刷新
function refresh() {
  emits("queryTable")
}

// 右侧列表元素变化
function dataChange(data) {
  if (Array.isArray(props.columns)) {
    for (let item in props.columns) {
      const key = props.columns[item].key
      props.columns[item].visible = !data.includes(key)
    }
  } else {
    Object.keys(props.columns).forEach((key, index) => {
      props.columns[key].visible = !data.includes(index)
    })
  }
  saveStorage()
}

// 打开显隐列dialog
function showColumn() {
  open.value = true
}

// 如果传入了 storageKey，从 localStorage 恢复列显隐状态
if (props.storageKey) {
  try {
    const saved = cache.local.getJSON(props.storageKey)
    if (saved && typeof saved === 'object') {
      if (Array.isArray(props.columns)) {
        props.columns.forEach((col, index) => {
          if (saved[index] !== undefined) col.visible = saved[index]
        })
      } else {
        Object.keys(props.columns).forEach(key => {
          if (saved[key] !== undefined) props.columns[key].visible = saved[key]
        })
      }
    }
  } catch (e) {}
}
if (props.showColumnsType == "transfer") {
  // transfer穿梭显隐列初始默认隐藏列
  if (Array.isArray(props.columns)) {
    for (let item in props.columns) {
      if (props.columns[item].visible === false) {
        value.value.push(parseInt(item))
      }
    }
  } else {
    Object.keys(props.columns).forEach((key, index) => {
      if (props.columns[key].visible === false) {
        value.value.push(index)
      }
    })
  }
}

// 单勾选
function checkboxChange(event, key) {
  if (Array.isArray(props.columns)) {
    props.columns.filter(item => item.key == key)[0].visible = event
  } else {
    props.columns[key].visible = event
  }
  saveStorage()
}

// 切换全选/反选
function toggleCheckAll() {
  const newValue = !isChecked.value
  if (Array.isArray(props.columns)) {
    props.columns.forEach((col) => (col.visible = newValue))
  } else {
    Object.values(props.columns).forEach((col) => (col.visible = newValue))
  }
  saveStorage()
}

// 将当前列显隐状态持久化到 localStorage
function saveStorage() {
  if (!props.storageKey) return
  try {
    let state = {}
    if (Array.isArray(props.columns)) {
      props.columns.forEach((col, index) => { state[index] = col.visible })
    } else {
      Object.keys(props.columns).forEach(key => { state[key] = props.columns[key].visible })
    }
    cache.local.setJSON(props.storageKey, state)
  } catch (e) {}
}
</script>

<style lang='scss' scoped>
:deep(.el-transfer__button) {
  border-radius: 50%;
  display: block;
  margin-left: 0px;
}
:deep(.el-transfer__button:first-child) {
  margin-bottom: 10px;
}
:deep(.el-dropdown-menu__item) {
  line-height: 30px;
  padding: 0 17px;
}
.check-line {
  width: 90%;
  height: 1px;
  background-color: #ccc;
  margin: 3px auto;
}
</style>
