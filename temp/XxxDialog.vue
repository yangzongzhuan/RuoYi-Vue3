<template>
  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="500px"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="dialogClose"
  >

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm">
          确 定
        </el-button>
        <el-button @click="cancel">
          取 消
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>


const emit = defineEmits(['refresh'])
defineExpose({
  openDialog,
})
const { proxy } = getCurrentInstance()

const dialogVisible = ref(false)
const dialogTitle = ref('')

const dialogForm = ref({})
function openDialog(title, resDetailData) {
  dialogVisible.value = true
  dialogTitle.value = title
  if (resDetailData) {
    dialogForm.value = resDetailData
  }
}
function cancel() {
  dialogVisible.value = false
}
function submitForm()
function dialogClose() {}
</script>
