import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken(): any {
  return Cookies.get(TokenKey)
}

export function setToken(token: string): any {
  return Cookies.set(TokenKey, token)
}

export function removeToken(): any {
  return Cookies.remove(TokenKey)
}
