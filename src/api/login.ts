import request from '@/utils/request'
type params = string | number | null | undefined
// 登录方法
export function login(username:params, password:params, code:params, uuid:params): Promise<any> {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    headers: {
      isToken: false,
      repeatSubmit: false
    },
    method: 'post',
    data: data
  })
}

// 注册方法
export function register(data:any): Promise<any> {
  return request({
    url: '/register',
    headers: {
      isToken: false
    },
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo(): Promise<any> {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout(): Promise<any> {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg(): Promise<any> {
  return request({
    url: '/captchaImage',
    headers: {
      isToken: false
    },
    method: 'get',
    timeout: 20000
  })
}