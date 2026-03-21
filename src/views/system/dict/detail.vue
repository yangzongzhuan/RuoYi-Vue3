<template>
  <el-drawer :model-value="visible" direction="rtl" size="700px" append-to-body @update:model-value="$emit('update:visible', $event)">
    <!-- 自定义标题 -->
    <template #header>
      <div class="drawer-head">
        <el-icon style="color:#5b9bd5;margin-right:8px;"><List /></el-icon>
        <span class="drawer-head-name">{{ row.dictName }}</span>
        <span class="drawer-head-type">{{ row.dictType }}</span>
      </div>
    </template>

    <div class="drawer-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="drawer-loading">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span>加载中...</span>
      </div>

      <!-- 空数据 -->
      <div v-else-if="!dataList.length" class="drawer-empty">
        <el-icon style="font-size:36px;"><Document /></el-icon>
        <div>暂无字典数据</div>
      </div>

      <template v-else>
        <!-- 统计卡片 -->
        <el-row :gutter="12" class="stat-row">
          <el-col :span="disabledCount > 0 ? 8 : 12">
            <div class="stat-card">
              <div class="stat-num">{{ dataList.length }}</div>
              <div class="stat-label">共计条目</div>
            </div>
          </el-col>
          <el-col :span="disabledCount > 0 ? 8 : 12">
            <div class="stat-card">
              <div class="stat-num success">{{ normalCount }}</div>
              <div class="stat-label">正常</div>
            </div>
          </el-col>
          <el-col v-if="disabledCount > 0" :span="8">
            <div class="stat-card">
              <div class="stat-num danger">{{ disabledCount }}</div>
              <div class="stat-label">停用</div>
            </div>
          </el-col>
        </el-row>

        <!-- 数据列表 -->
        <div v-for="item in dataList" :key="item.dictCode" class="dict-item">
          <div class="dict-cell">
            <div class="dict-cell-key">标签</div>
            <div class="dict-cell-val">
              <el-tag v-if="item.listClass && item.listClass !== 'default'" :type="item.listClass === 'primary' ? undefined : item.listClass" size="small">{{ item.dictLabel }}</el-tag>
              <span v-else>{{ item.dictLabel }}</span>
            </div>
          </div>
          <div class="dict-cell">
            <div class="dict-cell-key">键值</div>
            <div class="dict-cell-val">{{ item.dictValue }}</div>
          </div>
          <div class="dict-cell">
            <div class="dict-cell-key">状态</div>
            <div class="dict-cell-val">
              <el-tag :type="item.status === '0' ? 'success' : 'danger'" size="small">
                {{ item.status === '0' ? '正常' : '停用' }}
              </el-tag>
            </div>
          </div>
        </div>
      </template>
    </div>
  </el-drawer>
</template>

<script setup>
import { listData } from '@/api/system/dict/data'

const props = defineProps({
  visible: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:visible'])

const loading = ref(false)
const dataList = ref([])

const normalCount = computed(() => dataList.value.filter(r => r.status === '0').length)
const disabledCount = computed(() => dataList.value.filter(r => r.status !== '0').length)

watch(() => props.visible, (val) => {
  if (val) {
    loadData()
  } else {
    dataList.value = []
  }
})

function loadData() {
  if (!props.row?.dictType) return
  loading.value = true
  dataList.value = []
  listData({ dictType: props.row.dictType, pageSize: 100, pageNum: 1 }).then(response => {
    dataList.value = response.rows || []
  }).catch(() => {}).finally(() => {
    loading.value = false
  })
}
</script>

<style scoped>
.drawer-head {
  display: flex;
  align-items: center;
}
.drawer-head-name {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-right: 8px;
}
.drawer-head-type {
  font-size: 14px;
  color: #95a5a6;
  font-family: monospace;
}
.drawer-wrap {
  padding: 0 20px 20px;
}
.drawer-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  color: #aaa;
  font-size: 13px;
  gap: 8px;
}
.drawer-empty {
  text-align: center;
  color: #bbb;
  padding: 60px 0;
  font-size: 13px;
}
.drawer-empty .el-icon {
  display: block;
  margin: 0 auto 8px;
}
.stat-row {
  margin-bottom: 16px;
}
.stat-card {
  background: #f7f9fb;
  border: 1px solid #e8ecf0;
  border-radius: 6px;
  padding: 10px 14px;
  text-align: center;
}
.stat-num {
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
}
.stat-num.success { color: #27ae60; }
.stat-num.danger  { color: #e74c3c; }
.stat-label {
  font-size: 11px;
  color: #95a5a6;
  margin-top: 4px;
}
.dict-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid #e8ecf0;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
}
.dict-cell {
  display: grid;
  grid-template-columns: 70px 1fr;
  border-right: 1px solid #f0f4f8;
}
.dict-cell:last-child {
  border-right: 0;
}
.dict-cell-key {
  padding: 9px 14px;
  font-size: 12px;
  color: #888;
  background: #f7f9fb;
  border-right: 1px solid #f0f4f8;
}
.dict-cell-val {
  padding: 9px 14px;
  font-size: 13px;
  color: #2c3e50;
  word-break: break-all;
  display: flex;
  align-items: center;
}
</style>
