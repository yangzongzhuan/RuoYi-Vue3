import request from '@/utils/request';

export function uploadImage(data, onUploadProgress = () => {}) {
  return request({
    url: '/common/upload',
    method: 'post',
    data: data,
    onUploadProgress,
  });
}
