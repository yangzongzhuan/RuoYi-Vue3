import { getToken, setToken, removeToken } from '@/utils/auth'
import { isEmpty } from "@/utils/validate"
import useLockStore from '@/store/modules/lock'
import defAva from '@/assets/images/profile.jpg'

const LOCAL_USER = {
  userName: 'admin',
  nickName: '管理员',
  userId: 1,
  avatar: '',
  email: 'admin@example.com',
  phonenumber: '15888888888',
}
const LOCAL_ROLES = ['admin']
const LOCAL_PERMISSIONS = ['*:*:*']

const useUserStore = defineStore(
  'user',
  {
    state: () => ({
      token: getToken(),
      id: '',
      name: '',
      nickName: '',
      avatar: '',
      roles: [],
      permissions: []
    }),
    actions: {
      login(userInfo) {
        const username = userInfo.username.trim()
        const password = userInfo.password
        return new Promise((resolve, reject) => {
          if (username === 'admin' && password === 'admin123') {
            const token = 'mock_token_' + Date.now()
            setToken(token)
            this.token = token
            useLockStore().unlockScreen()
            resolve()
          } else {
            reject(new Error('账号或密码错误'))
          }
        })
      },
      getInfo() {
        return new Promise((resolve) => {
          this.roles = LOCAL_ROLES
          this.permissions = LOCAL_PERMISSIONS
          this.id = LOCAL_USER.userId
          this.name = LOCAL_USER.userName
          this.nickName = LOCAL_USER.nickName
          this.avatar = LOCAL_USER.avatar || defAva
          resolve({ user: LOCAL_USER, roles: LOCAL_ROLES, permissions: LOCAL_PERMISSIONS })
        })
      },
      logOut() {
        return new Promise((resolve) => {
          this.token = ''
          this.roles = []
          this.permissions = []
          removeToken()
          resolve()
        })
      }
    }
  })

export default useUserStore
