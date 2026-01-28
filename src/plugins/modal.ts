import { ElMessage, ElMessageBox, ElNotification, ElLoading } from 'element-plus'

let loadingInstance: ReturnType<typeof ElLoading.service>

export default {
  // 消息提示
  msg(content: string) {
    ElMessage.info(content)
  },
  // 错误消息
  msgError(content: string) {
    ElMessage.error(content)
  },
  // 成功消息
  msgSuccess(content: string) {
    ElMessage.success(content)
  },
  // 警告消息
  msgWarning(content: string) {
    ElMessage.warning(content)
  },
  // 弹出提示
  alert(content: string) {
    ElMessageBox.alert(content, "系统提示")
  },
  // 错误提示
  alertError(content: string) {
    ElMessageBox.alert(content, "系统提示", { type: 'error' })
  },
  // 成功提示
  alertSuccess(content: string) {
    ElMessageBox.alert(content, "系统提示", { type: 'success' })
  },
  // 警告提示
  alertWarning(content: string) {
    ElMessageBox.alert(content, "系统提示", { type: 'warning' })
  },
  // 通知提示
  notify(content: string) {
    ElNotification.info(content)
  },
  // 错误通知
  notifyError(content: string) {
    ElNotification.error(content)
  },
  // 成功通知
  notifySuccess(content: string) {
    ElNotification.success(content)
  },
  // 警告通知
  notifyWarning(content: string) {
    ElNotification.warning(content)
  },
  // 确认窗体
  confirm(content: string) {
    return ElMessageBox.confirm(content, "系统提示", {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: "warning",
    })
  },
  // 提交内容
  prompt(content: string) {
    return ElMessageBox.prompt(content, "系统提示", {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: "warning",
    })
  },
  // 打开遮罩层
  loading(content: string) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: content,
      background: "rgba(0, 0, 0, 0.7)",
    })
  },
  // 关闭遮罩层
  closeLoading() {
    loadingInstance.close()
  }
}
