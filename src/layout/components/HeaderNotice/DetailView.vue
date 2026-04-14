<template>
  <el-drawer v-model="visible" title="公告详情" direction="rtl" size="50%" append-to-body :before-close="handleClose" class="notice-detail-drawer">
    <div v-loading="loading" class="notice-detail-drawer__body">
      <div v-if="!detail" class="notice-empty">
        <el-icon><Document /></el-icon>
        <span>暂无数据</span>
      </div>
      <div v-else class="notice-page">
        <div class="notice-type-wrap">
          <span v-if="detail.noticeType === '1'" class="notice-type-tag type-notify">
            <el-icon><Bell /></el-icon> 通知
          </span>
          <span v-else-if="detail.noticeType === '2'" class="notice-type-tag type-announce">
            <el-icon><Message /></el-icon> 公告
          </span>
          <span v-else class="notice-type-tag type-notify">
            <el-icon><Document /></el-icon> 消息
          </span>
        </div>

        <h1 class="notice-title">{{ detail.noticeTitle }}</h1>

        <div class="notice-meta">
          <span class="meta-item">
            <el-icon><User /></el-icon>
            <span>{{ detail.createBy || '—' }}</span>
          </span>
          <span class="meta-item">
            <el-icon><Clock /></el-icon>
            <span>{{ detail.createTime || '—' }}</span>
          </span>
          <span class="meta-item">
            <span :class="['status-dot', isStatusNormal ? 'status-ok' : 'status-off']"></span>
            <span>{{ isStatusNormal ? '正常' : '已关闭' }}</span>
          </span>
        </div>

        <div class="notice-divider">
          <span class="notice-divider-dot"></span>
          <span class="notice-divider-dot"></span>
          <span class="notice-divider-dot"></span>
        </div>

        <div class="notice-body">
          <div v-if="hasContent" class="notice-content" v-html="detail.noticeContent" />
          <div v-else class="notice-empty notice-empty--inner">
            <el-icon><Document /></el-icon> 暂无内容
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { getNotice } from '@/api/system/notice'

const visible = ref(false)
const loading = ref(false)
const detail = ref(null)

const isStatusNormal = computed(() => {
  const status = detail.value && detail.value.status
  return status === '0' || status === 0
})

const hasContent = computed(() => {
  const content = detail.value && detail.value.noticeContent
  return content != null && String(content).trim() !== ''
})

function open(payload) {
  let id = null
  let preset = null
  if (payload != null && typeof payload === 'object') {
    id = payload.noticeId
    if (payload.noticeContent != null) {
      preset = payload
    }
  } else {
    id = payload
  }
  visible.value = true
  if (preset) {
    detail.value = preset
    return
  }
  if (id == null || id === '') {
    detail.value = null
    return
  }
  loading.value = true
  detail.value = null
  getNotice(id).then(res => {
    detail.value = res.data
  }).catch(() => {
    detail.value = null
  }).finally(() => {
    loading.value = false
  })
}

function handleClose() {
  visible.value = false
  detail.value = null
  loading.value = false
}

defineExpose({
  open
})
</script>

<style lang="scss" scoped>
.notice-page {
  max-width: 760px;
  margin: 0 auto;
  padding: 8px 8px 20px;
  animation: notice-fade-up 0.28s ease both;
}

@keyframes notice-fade-up {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notice-type-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 12px;
  border-radius: 2px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.type-notify {
  background: #fff8e6;
  color: #b7791f;
  border-left: 3px solid #d97706;
}

.type-announce {
  background: #e8f5e9;
  color: #276749;
  border-left: 3px solid #38a169;
}

.notice-title {
  font-size: 22px;
  font-weight: 700;
  color: #1a202c;
  line-height: 1.45;
  margin: 0 0 16px;
  letter-spacing: -0.2px;
}

.notice-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  padding: 12px 0;
  border-top: 1px solid #e9ecef;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 28px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #718096;
}

.meta-item .el-icon {
  font-size: 12px;
  color: #a0aec0;
}

.status-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-right: 4px;
}

.status-ok {
  background: #38a169;
}

.status-off {
  background: #e53e3e;
}

.notice-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.notice-divider::before,
.notice-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, #dee2e6, transparent);
}

.notice-divider-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #cbd5e0;
}

.notice-body {
  background: #fff;
  border-radius: 6px;
  padding: 28px 32px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.04);
  min-height: 120px;
}

.notice-content {
  font-size: 14px;
  line-height: 1.85;
  color: #2d3748;
  word-break: break-word;
}

.notice-content :deep(p) {
  margin: 0 0 1em;
}

.notice-content :deep(h1),
.notice-content :deep(h2),
.notice-content :deep(h3) {
  font-weight: 700;
  color: #1a202c;
  margin: 1.4em 0 0.6em;
}

.notice-content :deep(h1) {
  font-size: 18px;
}

.notice-content :deep(h2) {
  font-size: 16px;
}

.notice-content :deep(h3) {
  font-size: 14px;
}

.notice-content :deep(a) {
  color: #3182ce;
  text-decoration: underline;
}

.notice-content :deep(a:hover) {
  color: #2b6cb0;
}

.notice-content :deep(img) {
  max-width: 100%;
  border-radius: 4px;
  margin: 8px 0;
}

.notice-content :deep(ul),
.notice-content :deep(ol) {
  padding-left: 20px;
  margin: 0 0 1em;
}

.notice-content :deep(li) {
  margin-bottom: 4px;
}

.notice-content :deep(blockquote) {
  border-left: 3px solid #cbd5e0;
  margin: 1em 0;
  padding: 6px 16px;
  color: #718096;
  background: #f7fafc;
}

.notice-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
  font-size: 13px;
}

.notice-content :deep(table th),
.notice-content :deep(table td) {
  border: 1px solid #e2e8f0;
  padding: 7px 12px;
}

.notice-content :deep(table th) {
  background: #f7fafc;
  font-weight: 600;
}

.notice-empty {
  text-align: center;
  padding: 40px 0;
  color: #a0aec0;
  font-size: 13px;
}

.notice-empty .el-icon {
  font-size: 28px;
  display: inline-flex;
  margin-bottom: 10px;
}

.notice-empty--inner {
  padding: 32px 0;
}

.notice-detail-drawer__body {
  height: 100%;
  overflow: auto;
  padding: 10px 16px 22px;
}
</style>

<style lang="scss">
.notice-detail-drawer {
  .el-drawer__header {
    margin-bottom: 0;
    padding: 16px 20px;
    border-bottom: 1px solid #ebeef5;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
  }
  
  .el-drawer__body {
    background: #f5f6f8;
    padding: 0;
  }
}
</style>
