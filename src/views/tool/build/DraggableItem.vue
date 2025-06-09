<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-col :span="element.span" :class="className" @click.stop="activeItem(element)">
    <el-form-item
      v-if="element.layout === 'colFormItem'" :label="element.label"
      :label-width="element.labelWidth ? `${element.labelWidth}px` : null" :required="element.required"
    >
      <render :key="element.tag" v-model="element.defaultValue" :conf="element" />
    </el-form-item>
    <el-row v-else :gutter="element.gutter" :class="element.class" @click.stop="activeItem(element)">
      <span class="component-name"> {{ element.componentName }} </span>
      <draggable
        ref="draggableItemRef" group="componentsGroup" :animation="340" :list="element.children" class="drag-wrapper"
        item-key="label" :component-data="getComponentData()"
      >
        <template #item="scoped">
          <draggable-item
            :key="scoped.element.renderKey" :drawing-list="element.children" :element="scoped.element"
            :index="index" :active-id="activeId" :form-conf="formConf" @active-item="activeItem(scoped.element)"
            @copy-item="copyItem(scoped.element, element.children)"
            @delete-item="deleteItem(scoped.index, element.children)"
          />
        </template>
      </draggable>
    </el-row>
    <span class="drawing-item-copy" title="复制" @click.stop="copyItem(element)">
      <el-icon><CopyDocument /></el-icon>
    </span>
    <span class="drawing-item-delete" title="删除" @click.stop="deleteItem(index)">
      <el-icon><Delete /></el-icon>
    </span>
  </el-col>
</template>

<script setup name="DraggableItem">
import draggable from 'vuedraggable/dist/vuedraggable.common'
import render from '@/utils/generator/render'

const props = defineProps({
  element: Object,
  index: Number,
  drawingList: Array,
  activeId: {
    type: [String, Number],
  },
  formConf: Object,
})
const emits = defineEmits(['activeItem', 'copyItem', 'deleteItem'])
const className = ref('')
const draggableItemRef = ref(null)
function activeItem(item) {
  emits('activeItem', item)
}
function copyItem(item, parent) {
  emits('copyItem', item, parent ?? props.drawingList)
}
function deleteItem(item, parent) {
  emits('deleteItem', item, parent ?? props.drawingList)
}

function getComponentData() {
  return {
    gutter: props.element.gutter,
    justify: props.element.justify,
    align: props.element.align,
  }
}

watch(() => props.activeId, (val) => {
  if (props.element.layout === 'rowFormItem') {
    className.value = `drawing-row-item${val === props.element.formId ? ' active-from-item' : ''}`
  }
  else {
    className.value = `drawing-item${val === props.element.formId ? ' active-from-item' : ''}`
  }

  if (props.formConf.unFocusedComponentBorder) {
    className.value += ' unfocus-bordered'
  }
}, { immediate: true })
</script>
