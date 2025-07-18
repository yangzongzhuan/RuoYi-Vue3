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
    <el-form ref="dialogFromRef" :model="dialogForm" :rules="rules" label-width="80px">
      <el-form-item label="参数名称" prop="configName">
        <el-input v-model="dialogForm.configName" placeholder="请输入参数名称" />
      </el-form-item>
      <el-form-item label="参数键名" prop="configKey">
        <el-input v-model="dialogForm.configKey" placeholder="请输入参数键名" />
      </el-form-item>
      <el-form-item label="参数键值" prop="configValue">
        <el-input v-model="dialogForm.configValue" type="textarea" placeholder="请输入参数键值" />
      </el-form-item>
      <el-form-item label="系统内置" prop="configType">
        <el-radio-group v-model="dialogForm.configType">
          <el-radio
            v-for="dict in sys_yes_no"
            :key="dict.value"
            :value="dict.value"
          >
            {{ dict.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dialogForm.remark" type="textarea" placeholder="请输入内容" />
      </el-form-item>
    </el-form>
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
import { addConfig, updateConfig } from '@/api/system/config'

const emit = defineEmits(['refresh'])
defineExpose({
  openDialog,
})
const { proxy } = getCurrentInstance()
const { sys_yes_no } = proxy.useDict('sys_yes_no')
const dialogVisible = ref(false)
const dialogTitle = ref('')

const dialogForm = ref({
  configId: undefined,
  configName: undefined,
  configKey: undefined,
  configValue: undefined,
  configType: 'Y',
  remark: undefined,
})
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
function dialogClose() {
  dialogForm.value = {
    configId: undefined,
    configName: undefined,
    configKey: undefined,
    configValue: undefined,
    configType: 'Y',
    remark: undefined,
  }
  proxy.resetForm('dialogFromRef')
}
/** 提交按钮 */
function submitForm() {
  proxy.$refs.dialogFromRef.validate((valid) => {
    if (valid) {
      if (dialogForm.value.configId != undefined) {
        updateConfig(dialogForm.value).then(() => {
          proxy.$modal.msgSuccess('修改成功')
          cancel()
          emit('refresh')
        })
      }
      else {
        addConfig(dialogForm.value).then(() => {
          proxy.$modal.msgSuccess('新增成功')
          cancel()
          emit('refresh')
        })
      }
    }
  })
}

let rules = {
  configName: [{ required: true, message: '参数名称不能为空', trigger: 'blur' }],
  configKey: [{ required: true, message: '参数键名不能为空', trigger: 'blur' }],
  configValue: [{ required: true, message: '参数键值不能为空', trigger: 'blur' }],
}
</script>
