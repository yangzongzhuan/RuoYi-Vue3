<template>
  <div class="icon-body">
    <el-input
      v-model="iconName"
      class="icon-search"
      clearable
      placeholder="请输入图标名称"
      @clear="filterIcons"
      @input="filterIcons"
    >
      <template #suffix>
        <i class="el-icon-search el-input__icon" />
      </template>
    </el-input>
    <div class="icon-list">
      <div class="list-container">
        <div v-for="(item, index) in iconList" :key="index" class="icon-item-wrapper" @click="selectedIcon(item)">
          <div class="icon-item" :class="[{ active: activeIcon === item }]">
            <svg-icon :icon-class="item" class-name="icon" style="width: 16px;height: 25px;" />
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import icons from './requireIcons'

defineProps({
  activeIcon: {
    type: String,
  },
})

const emit = defineEmits(['selected'])
const iconName = ref('')
const iconList = ref(icons)
function filterIcons() {
  // 如果没有过滤条件，直接返回完整的图标列表
  if (!iconName.value) {
    iconList.value = icons
    return
  }

  // 根据图标名称过滤图标列表
  iconList.value = icons.filter(item => item.includes(iconName.value))
}

function selectedIcon(name) {
  emit('selected', name)
  document.body.click()
}

function reset() {
  iconName.value = ''
  iconList.value = icons
}

defineExpose({
  reset,
})
</script>

<style lang='scss' scoped>
   .icon-body {
    width: 100%;
    padding: 10px;

    .icon-search {
      position: relative;
      margin-bottom: 5px;
    }

    .icon-list {
      height: 200px;
      overflow: auto;

      .list-container {
        display: flex;
        flex-wrap: wrap;

        .icon-item-wrapper {
          display: flex;
          width: calc(100% / 3);
          height: 25px;
          line-height: 25px;
          cursor: pointer;

          .icon-item {
            display: flex;
            max-width: 100%;
            height: 100%;
            padding: 0 5px;

            &:hover {
              background: #ececec;
              border-radius: 5px;
            }

            .icon {
              flex-shrink: 0;
            }

            span {
              display: inline-block;
              padding-left: 2px;
              overflow: hidden;
              text-overflow: ellipsis;
              vertical-align: -0.15em;
              white-space: nowrap;
              fill: currentcolor;
            }
          }

          .icon-item.active {
            background: #ececec;
            border-radius: 5px;
          }
        }
      }
    }
  }
</style>
