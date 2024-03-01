<template>
  <!-- 导入表 -->
  <el-dialog v-model="visible" title="导入表" width="800px" top="5vh" append-to-body>
    <el-form ref="queryRef" :model="queryParams" :inline="true">
      <el-form-item label="表名称" prop="tableName">
        <el-input v-model="queryParams.tableName" placeholder="请输入表名称" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="表描述" prop="tableComment">
        <el-input v-model="queryParams.tableComment" placeholder="请输入表描述" clearable @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table
        ref="table"
        :data="dbTableList"
        height="260px"
        @rowClick="clickRow"
        @selectionChange="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="tableName" label="表名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="tableComment" label="表描述" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        :total="total"
        @pagination="getList"
      />
    </el-row>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleImportTable">确 定</el-button>
        <el-button @click="visible = false">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { listDbTable, importTable } from '@/api/tool/gen'
import { ref, getCurrentInstance, ComponentInternalInstance, reactive } from 'vue'

const total = ref(0)
const visible = ref(false)
const tables = ref<any[]>([])
const dbTableList = ref<any[]>([])
const { proxy } = getCurrentInstance() as any

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  tableName: undefined,
  tableComment: undefined
})

const emit = defineEmits(['ok'])

/** 查询参数列表 */
function show() {
  getList()
  visible.value = true
}
/** 单击选择行 */
function clickRow(row: any) {
  proxy.$refs.table.toggleRowSelection(row)
}
/** 多选框选中数据 */
function handleSelectionChange(selection: any[]) {
  tables.value = selection.map(item => item.tableName)
}
/** 查询表数据 */
function getList() {
  listDbTable(queryParams).then((res: any) => {
    dbTableList.value = res.rows
    total.value = res.total
  })
}
/** 搜索按钮操作 */
function handleQuery() {
  queryParams.pageNum = 1
  getList()
}
/** 重置按钮操作 */
function resetQuery() {
  proxy?.resetForm(proxy, 'queryRef')
  handleQuery()
}
/** 导入按钮操作 */
function handleImportTable() {
  const tableNames = tables.value.join(',')
  if (tableNames === '') {
    proxy?.$modal.msgError('请选择要导入的表')
    return
  }
  importTable({ tables: tableNames }).then((res: any) => {
    proxy?.$modal.msgSuccess(res.msg)
    if (res.code === 200) {
      visible.value = false
      emit('ok')
    }
  })
}

defineExpose({
  show
})
</script>
