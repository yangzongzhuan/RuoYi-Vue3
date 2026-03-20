import request from '@/utils/request'

// 查询公告列表
export function listNotice(query) {
  return request({
    url: '/system/notice/list',
    method: 'get',
    params: query
  })
}

// 查询公告详细
export function getNotice(noticeId) {
  return request({
    url: '/system/notice/' + noticeId,
    method: 'get'
  })
}

// 新增公告
export function addNotice(data) {
  return request({
    url: '/system/notice',
    method: 'post',
    data: data
  })
}

// 修改公告
export function updateNotice(data) {
  return request({
    url: '/system/notice',
    method: 'put',
    data: data
  })
}

// 删除公告
export function delNotice(noticeId) {
  return request({
    url: '/system/notice/' + noticeId,
    method: 'delete'
  })
}

// 首页顶部公告列表（带已读状态）
export function listNoticeTop() {
  return request({
    url: '/system/notice/listTop',
    method: 'get'
  })
}

// 标记公告已读
export function markNoticeRead(noticeId) {
  return request({
    url: '/system/notice/markRead',
    method: 'post',
    params: { noticeId }
  })
}

// 批量标记已读
export function markNoticeReadAll(ids) {
  return request({
    url: '/system/notice/markReadAll',
    method: 'post',
    params: { ids }
  })
}
