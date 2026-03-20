const LOCK_KEY = 'screen-lock'
const LOCK_PATH_KEY = 'screen-lock-path'

export const useLockStore = defineStore('lock', {
  state: () => ({
    isLock: JSON.parse(localStorage.getItem(LOCK_KEY) || 'false'),
    lockPath: localStorage.getItem(LOCK_PATH_KEY) || '/index'
  }),
  actions: {
    // 锁定屏幕，同时记录当前路径
    lockScreen(currentPath) {
      this.lockPath = currentPath || '/index'
      localStorage.setItem(LOCK_PATH_KEY, this.lockPath)
      this.isLock = true
      localStorage.setItem(LOCK_KEY, 'true')
    },
    // 解锁屏幕，清除路径
    unlockScreen() {
      this.isLock = false
      localStorage.setItem(LOCK_KEY, 'false')
      this.lockPath = '/index'
      localStorage.setItem(LOCK_PATH_KEY, '/index')
    }
  }
})

export default useLockStore
