<template>
  <el-table-column :label="label" :align="align" :width:="width">
    <template #default="scope">
      {{ serialNumber(scope) }}
    </template>
  </el-table-column>
</template>

<script setup>
const props = defineProps({
  queryParams: Object,
  label: String,
  align: String,
  width: String
});
const serialNumber = (scope) => {
  return (props.queryParams.pageNum - 1) * props.queryParams.pageSize + scope.$index + 1;
};
</script>