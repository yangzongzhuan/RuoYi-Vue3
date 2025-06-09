<template>
  <!-- 创建表 -->
  <el-dialog v-model="visible" title="创建表" width="800px" top="5vh" append-to-body>
    <span>创建表语句(支持多个建表语句)：</span>
    <el-input v-model="content" type="textarea" :rows="10" placeholder="请输入文本" />
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleImportTable">
          确 定
        </el-button>
        <el-button @click="visible = false">
          取 消
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { createTable } from '@/api/tool/gen'

const emit = defineEmits(['ok'])
const visible = ref(false)
const content = ref('')
const { proxy } = getCurrentInstance()
/** 显示弹框 */
function show() {
  visible.value = true
}

/** 导入按钮操作 */
function handleImportTable() {
  if (content.value === '') {
    proxy.$modal.msgError('请输入建表语句')
    return
  }
  createTable({ sql: content.value }).then((res) => {
    proxy.$modal.msgSuccess(res.msg)
    if (res.code === 200) {
      visible.value = false
      emit('ok')
    }
  })
}

defineExpose({
  show,
})
</script>
