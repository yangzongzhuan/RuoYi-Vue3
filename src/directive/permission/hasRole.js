/**
 * v-hasRole 角色权限处理
 * Copyright (c) 2019 ruoyi
 */

import useUserStore from '@/store/modules/user'

export default {
  mounted(el, binding) {
    const { value } = binding
    const superAdmin = 'admin'
    const { roles } = useUserStore()

    if (value && value instanceof Array && value.length > 0) {
      const roleFlag = value

      const hasRole = roles.some((role) => {
        return superAdmin === role || roleFlag.includes(role)
      })

      if (!hasRole) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`请设置角色权限标签值`)
    }
  },
}
