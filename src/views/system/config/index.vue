<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryRef" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item label="参数名称" prop="configName">
        <el-input
          v-model="queryParams.configName"
          placeholder="请输入参数名称"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="参数键名" prop="configKey">
        <el-input
          v-model="queryParams.configKey"
          placeholder="请输入参数键名"
          clearable
          style="width: 240px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="系统内置" prop="configType">
        <el-select v-model="queryParams.configType" placeholder="系统内置" clearable style="width: 240px">
          <el-option
            v-for="dict in sys_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" style="width: 308px;">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">
          搜索
        </el-button>
        <el-button icon="Refresh" @click="resetQuery">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:config:add']"
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
        >
          新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:config:edit']"
          type="success"
          plain
          icon="Edit"
          :disabled="tableSelectedRowNum != 1"
          @click="handleUpdate"
        >
          修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:config:remove']"
          type="danger"
          plain
          icon="Delete"
          :disabled="tableSelectedRowNum == 0"
          @click="handleDelete"
        >
          删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:config:export']"
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
        >
          导出
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:config:remove']"
          type="danger"
          plain
          icon="Refresh"
          @click="handleRefreshCache"
        >
          刷新缓存
        </el-button>
      </el-col>
      <right-toolbar v-model:show-search="showSearch" @query-table="getList" />
    </el-row>

    <el-table v-loading="tableLoading" :data="tableData" @selection-change="(v) => handleSelectionChange(v, 'configId')">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="参数主键" align="center" prop="configId" />
      <el-table-column label="参数名称" align="center" prop="configName" :show-overflow-tooltip="true" />
      <el-table-column label="参数键名" align="center" prop="configKey" :show-overflow-tooltip="true" />
      <el-table-column label="参数键值" align="center" prop="configValue" :show-overflow-tooltip="true" />
      <el-table-column label="系统内置" align="center" prop="configType">
        <template #default="scope">
          <dict-tag :options="sys_yes_no" :value="scope.row.configType" />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button v-hasPermi="['system:config:edit']" link type="primary" icon="Edit" @click="handleUpdate(scope.row)">
            修改
          </el-button>
          <el-button v-hasPermi="['system:config:remove']" link type="primary" icon="Delete" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      v-model:page="pageNum"
      v-model:limit="pageSize"
      :total="total"
      @pagination="getList"
    />

    <!-- 添加或修改参数配置对话框 -->
    <EditDialog ref="editDialogRef" @refresh="getList" />
  </div>
</template>

<script setup>
import { delConfig, getConfig, listConfig, refreshCache } from '@/api/system/config'
import { useTable } from '@/hooks/useTable'
import EditDialog from './EditDialog.vue'

defineOptions({
  name: 'ConfigIndex',
})
const { proxy } = getCurrentInstance()
const { sys_yes_no } = proxy.useDict('sys_yes_no')
let {
  tableData,
  tableLoading,
  pageNum,
  pageSize,
  total,
  selectedRowIds,

  tableSelectedRowNum,
  //  重写handleSelectionChange
  handleSelectionChange,
} = useTable(getList)

const showSearch = ref(true)
const dateRange = ref([])
const queryParams = ref({
  configName: undefined,
  configKey: undefined,
  configType: undefined,
})

/** 查询参数列表 */
function getList() {
  tableLoading.value = true
  listConfig(proxy.addDateRange({
    ...queryParams.value,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  }, dateRange.value)).then((response) => {
    tableData.value = response.rows
    total.value = response.total
    tableLoading.value = false
  })
}

/** 搜索按钮操作 */
function handleQuery() {
  pageNum.value = 1
  getList()
}

/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = []
  proxy.resetForm('queryRef')
  handleQuery()
}

/** 新增按钮操作 */
function handleAdd() {
  proxy.$refs.editDialogRef.openDialog('添加参数')
}

/** 修改按钮操作 */
function handleUpdate(row) {
  const configId = row.configId || selectedRowIds.value
  getConfig(configId).then((response) => {
    proxy.$refs.editDialogRef.openDialog('修改参数', response.data)
  })
}

/** 删除按钮操作 */
function handleDelete(row) {
  const configIds = row.configId || selectedRowIds.value
  proxy.$modal.confirm(`是否确认删除参数编号为"${configIds}"的数据项？`).then(() => {
    return delConfig(configIds)
  }).then(() => {
    getList()
    proxy.$modal.msgSuccess('删除成功')
  }).catch(() => {})
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/config/export', {
    ...queryParams.value,
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  }, `config_${new Date().getTime()}.xlsx`)
}

/** 刷新缓存按钮操作 */
function handleRefreshCache() {
  refreshCache().then(() => {
    proxy.$modal.msgSuccess('刷新缓存成功')
  })
}

getList()
</script>
