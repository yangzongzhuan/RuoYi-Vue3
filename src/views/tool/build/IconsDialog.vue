<template>
  <div class="icon-dialog">
    <el-dialog v-model="value" width="980px" :close-on-click-modal="false" :modal-append-to-body="false" @open="onOpen"
      @close="onClose">
      <template #header="{ close, titleId, titleClass }">
        选择图标
        <el-input v-model="key" size="small" :style="{ width: '260px' }" placeholder="请输入图标名称" prefix-icon="Search"
          clearable />
      </template>
      <ul class="icon-ul">
        <li v-for="icon in iconList" :key="icon" :class="active === icon ? 'active-item' : ''" @click="onSelect(icon)">
          <div>
            <el-icon :size="30">
              <component :is="icon" />
            </el-icon>
            <div>{{ icon }}</div>
          </div>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>
<script setup>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { watch } from 'vue'

const iconList = ref([])
const originList = []
const key = ref('')
const active = ref('')
const emit = defineEmits(['select'])
const value = defineModel()
for (const [key] of Object.entries(ElementPlusIconsVue)) {
  iconList.value.push(key)
  originList.push(key)
}

function onOpen() { }
function onClose() { }
function onSelect(icon) {
  active.value = icon
  emit('select', icon)
  value.value = false
}

watch(key, (val) => {
  if (val) {
    iconList.value = originList.filter(name => name.indexOf(val) > -1)
  } else {
    iconList.value = originList
  }
})
</script>
<style lang="scss" scoped>
.icon-ul {
  margin: 0;
  padding: 0;
  font-size: 0;

  li {
    list-style-type: none;
    text-align: center;
    font-size: 14px;
    display: inline-flex;
    width: 16.66%;
    box-sizing: border-box;
    height: 108px;
    padding: 6px 6px 6px 6px;
    cursor: pointer;
    overflow: hidden;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #f2f2f2;
    }

    &.active-item {
      background: #e1f3fb;
      color: #7a6df0
    }

    i {
      font-size: 30px;
      line-height: 50px;
      margin-bottom: 10px;
    }
  }
}

.icon-dialog {
  :deep() {
    .el-dialog {
      border-radius: 8px;
      margin-bottom: 0;
      margin-top: 4vh !important;
      display: flex;
      flex-direction: column;
      max-height: 92vh;
      overflow: hidden;
      box-sizing: border-box;

      .el-dialog__header {
        padding-top: 14px;
      }

      .el-dialog__body {
        margin: 0 20px 20px 20px;
        padding: 0;
        overflow: auto;
      }
    }
  }
}
</style>
