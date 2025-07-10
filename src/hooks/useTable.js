import { getCurrentInstance, reactive, ref, toRefs } from 'vue'

export function useTable(callback) {
  let { proxy } = getCurrentInstance()
  // --- table
  let tableLoading = ref(false)
  let tableData = ref([])
  const pagination = reactive({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })
  const { pageNum, pageSize, total } = toRefs(pagination)

  /** 搜索按钮操作 */
  function handleQuery() {
    pageNum.value = 1
    callback()
  }
  /** 重置按钮操作 */
  function resetQuery(refName) {
    proxy.$refs[refName].resetFields()
    handleQuery()
  }

  // --- table 选择数据
  let selectedRowIds = ref([])
  let selectedRowData = ref([])
  let tableSelectedRowNum = ref(0) //

  function handleSelectionChange(selection, filterAttribute) {
    filterAttribute = filterAttribute || 'id'
    selectedRowData.value = selection
    selectedRowIds.value = selection.map(item => item[filterAttribute])

    tableSelectedRowNum.value = selection.length
  }

  return {
    tableData,
    tableLoading,
    pageNum,
    pageSize,
    total,
    handleQuery,
    resetQuery,

    selectedRowIds,
    selectedRowData,
    tableSelectedRowNum,
    handleSelectionChange,
  }
}
