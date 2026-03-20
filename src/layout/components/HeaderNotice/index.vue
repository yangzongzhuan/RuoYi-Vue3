<template>
  <div>
    <el-popover ref="noticePopover" placement="bottom-end" :width="320" trigger="manual" v-model:visible="noticeVisible" popper-class="notice-popover">
      <!-- 弹出内容 -->
      <div class="notice-header">
        <span class="notice-title">通知公告</span>
        <span class="notice-mark-all" @click="markAllRead">全部已读</span>
      </div>
      <div v-if="noticeLoading" class="notice-loading">
        <el-icon class="is-loading"><Loading /></el-icon> 加载中...
      </div>
      <div v-else-if="noticeList.length === 0" class="notice-empty">
        <el-icon style="font-size:24px;display:block;margin-bottom:6px;"><Postcard /></el-icon>
        暂无公告
      </div>
      <div v-else>
        <div v-for="item in noticeList" :key="item.noticeId" class="notice-item" :class="{ 'is-read': item.isRead }" @click="previewNotice(item)">
          <el-tag size="small" :type="item.noticeType === '1' ? 'warning' : 'success'" class="notice-tag">
            {{ item.noticeType === '1' ? '通知' : '公告' }}
          </el-tag>
          <span class="notice-item-title">{{ item.noticeTitle }}</span>
          <span class="notice-item-date">{{ item.createTime }}</span>
        </div>
      </div>

      <!-- 触发器 -->
      <template #reference>
        <div class="right-menu-item hover-effect notice-trigger" @mouseenter="onNoticeEnter" @mouseleave="onNoticeLeave">
          <svg-icon icon-class="bell" />
          <span v-if="unreadCount > 0" class="notice-badge">{{ unreadCount }}</span>
        </div>
      </template>
    </el-popover>

    <!-- 预览弹窗 -->
    <el-dialog v-model="previewVisible" :title="previewTitle" width="680px" append-to-body class="notice-preview-dialog">
      <div class="notice-preview-meta">
        <el-tag size="small" :type="previewNoticeType === '1' ? 'warning' : 'success'">
          {{ previewNoticeType === '1' ? '通知' : '公告' }}
        </el-tag>
        <span class="notice-preview-info">
          <el-icon><User /></el-icon> {{ previewCreateBy }}
        </span>
        <span class="notice-preview-info">
          <el-icon><Timer /></el-icon> {{ previewCreateTime }}
        </span>
      </div>
      <div class="notice-preview-divider"></div>
      <div class="notice-preview-content" v-html="previewContent"></div>
    </el-dialog>
  </div>
</template>

<script setup>
import { listNoticeTop, markNoticeRead, markNoticeReadAll, getNotice } from '@/api/system/notice'

const noticePopover = ref(null)
const noticeList = ref([])
const unreadCount = ref(0)
const noticeLoading = ref(false)
const noticeVisible = ref(false)
const noticeLeaveTimer = ref(null)
const previewVisible = ref(false)
const previewTitle = ref('')
const previewContent = ref('')
const previewNoticeType = ref('')
const previewCreateBy = ref('')
const previewCreateTime = ref('')

// 加载顶部公告列表
function loadNoticeTop() {
  noticeLoading.value = true
  listNoticeTop().then(res => {
    noticeList.value = res.data || []
    unreadCount.value = res.unreadCount !== undefined ? res.unreadCount : noticeList.value.filter(n => !n.isRead).length
  }).finally(() => {
    noticeLoading.value = false
  })
}

onMounted(() => loadNoticeTop())

// 鼠标移入铃铛区域
function onNoticeEnter() {
  clearTimeout(noticeLeaveTimer.value)
  noticeVisible.value = true
  nextTick(() => {
    const popper = noticePopover.value?.popperRef?.contentRef
    if (popper && !popper._noticeBound) {
      popper._noticeBound = true
      popper.addEventListener('mouseenter', () => clearTimeout(noticeLeaveTimer.value))
      popper.addEventListener('mouseleave', () => {
        noticeLeaveTimer.value = setTimeout(() => { noticeVisible.value = false }, 100)
      })
    }
  })
}

// 鼠标离开铃铛区域
function onNoticeLeave() {
  noticeLeaveTimer.value = setTimeout(() => { noticeVisible.value = false }, 150)
}

// 预览公告详情
function previewNotice(item) {
  if (!item.isRead) {
    markNoticeRead(item.noticeId).catch(() => {})
    const idx = noticeList.value.indexOf(item)
    if (idx !== -1) noticeList.value[idx] = { ...item, isRead: true }
    unreadCount.value = Math.max(0, unreadCount.value - 1)
  }
  getNotice(item.noticeId).then(res => {
    const notice = res.data
    previewTitle.value = notice.noticeTitle
    previewContent.value = notice.noticeContent
    previewNoticeType.value = notice.noticeType
    previewCreateBy.value = notice.createBy
    previewCreateTime.value = notice.createTime
    previewVisible.value = true
  })
}

// 全部已读
function markAllRead() {
  const ids = noticeList.value.map(n => n.noticeId).join(',')
  if (!ids) return
  markNoticeReadAll(ids).catch(() => {})
  noticeList.value = noticeList.value.map(n => ({ ...n, isRead: true }))
  unreadCount.value = 0
}
</script>

<style lang="scss" scoped>
.notice-trigger {
  position: relative;
  transform: translateX(-6px);
  .svg-icon { width: 1.2em; height: 1.2em; vertical-align: -0.2em; }
  .notice-badge {
    position: absolute;
    top: 7px;
    right: -3px;
    background: #f56c6c;
    color: #fff;
    border-radius: 10px;
    font-size: 10px;
    height: 16px;
    line-height: 16px;
    padding: 0 4px;
    min-width: 16px;
    text-align: center;
    white-space: nowrap;
    pointer-events: none;
  }
}
.notice-popover { padding: 0 !important; }
.notice-popover .notice-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: #f7f9fb;
  border-bottom: 1px solid #eee;
  font-size: 13px;
  font-weight: 600;
  color: #333;
}
.notice-popover .notice-mark-all {
  font-size: 12px;
  color: var(--el-color-primary);
  font-weight: normal;
  cursor: pointer;
}
.notice-popover .notice-mark-all:hover { color: #2b7cc1; }
.notice-popover .notice-loading,
.notice-popover .notice-empty {
  padding: 24px;
  text-align: center;
  color: #bbb;
  font-size: 12px;
  line-height: 1.8;
}
.notice-popover .notice-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: background 0.15s;
}
.notice-popover .notice-item:last-child { border-bottom: none; }
.notice-popover .notice-item:hover { background: #f7f9fb; }
.notice-popover .notice-item.is-read .notice-tag,
.notice-popover .notice-item.is-read .notice-item-title,
.notice-popover .notice-item.is-read .notice-item-date { opacity: 0.45; filter: grayscale(1); color: #999; }
.notice-popover .notice-tag { flex-shrink: 0; }
.notice-popover .notice-item-title {
  flex: 1;
  font-size: 12px;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.notice-popover .notice-item-date {
  flex-shrink: 0;
  font-size: 11px;
  color: #bbb;
}
</style>

<style>
.notice-preview-dialog .el-dialog__body { padding: 0 10px 10px; }
.notice-preview-dialog .notice-preview-meta {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 0;
  font-size: 12px;
  color: #888;
}
.notice-preview-dialog .notice-preview-info { display: flex; align-items: center; gap: 4px; }
.notice-preview-dialog .notice-preview-divider {
  height: 1px;
  background: linear-gradient(to right, transparent, #e2e8f0, transparent);
  margin-bottom: 16px;
}
.notice-preview-dialog .notice-preview-content {
  font-size: 14px;
  line-height: 1.85;
  color: #2d3748;
  word-break: break-word;
}
.notice-preview-dialog .notice-preview-content img { max-width: 100%; border-radius: 4px; }
.notice-preview-dialog .notice-preview-content p { margin: 0 0 1em; }
.notice-preview-dialog .notice-preview-content a { color: var(--el-color-primary); text-decoration: underline; }
</style>
