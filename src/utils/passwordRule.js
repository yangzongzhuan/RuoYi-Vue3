/**
 * 密码强度规则
 * 根据参数 chrtype 动态生成校验规则
 *
 * chrtype 说明：
 *   0 - 任意字符（默认）
 *   1 - 纯数字（0-9）
 *   2 - 纯字母（a-z / A-Z）
 *   3 - 字母 + 数字（必须同时包含）
 *   4 - 字母 + 数字 + 特殊字符（必须同时包含，特殊字符：~!@#$%^&*()-=_+）
 */

import cache from '@/plugins/cache'

// 密码限制类型
const pwdChrType = ref(cache.session.get('pwrChrtype') || '0')

// 各类型对应的正则、错误提示
const PWD_RULES = {
  '0': { pattern: /^[^<>"'|\\]+$/, message: '密码不能包含非法字符：< > " \' \\ |' },
  '1': { pattern: /^[0-9]+$/, message: '密码只能为数字（0-9）' },
  '2': { pattern: /^[a-zA-Z]+$/, message: '密码只能为英文字母（a-z、A-Z）' },
  '3': { pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, message: '密码必须同时包含字母和数字' },
  '4': { pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()\-=_+])[A-Za-z\d~!@#$%^&*()\-=_+]+$/, message: '密码必须同时包含字母、数字和特殊字符（~!@#$%^&*()-=_+）' }
}

export function usePasswordRule() {
  // 默认密码校验
  const pwdValidator = computed(() => {
    const rule = PWD_RULES[pwdChrType.value] || PWD_RULES['0']
    return [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { min: 6, max: 20, message: '密码长度必须介于 6 和 20 之间', trigger: 'blur' },
      { pattern: rule.pattern, message: rule.message, trigger: 'blur' }
    ]
  })
  // 校验prompt的inputValidator函数
  const pwdPromptValidator = (value) => {
    const rule = PWD_RULES['0']
    if (!value || value.length < 6 || value.length > 20) {
      return '密码长度必须介于 6 和 20 之间'
    }
    if (!rule.pattern.test(value)) {
      return rule.message
    }
  }
  // 个人中心密码校验
  const infoPwdValidator = computed(() => {
    const rule = PWD_RULES[pwdChrType.value] || PWD_RULES['0']
    return [
      { required: true, message: '新密码不能为空', trigger: 'blur' },
      { min: 6, max: 20, message: '新密码长度必须介于 6 和 20 之间', trigger: 'blur' },
      { pattern: rule.pattern, message: rule.message, trigger: 'blur' }
    ]
  })
  // 注册页面密码校验
  const registerPwdValidator = computed(() => {
    const rule = PWD_RULES['0']
    return [
      { required: true, message: '请输入您的密码', trigger: 'blur' },
      { min: 6, max: 20, message: '用户密码长度必须介于 6 和 20 之间', trigger: 'blur' },
      { pattern: rule.pattern, message: rule.message, trigger: 'blur' }
    ]
  })

  return {
    pwdChrType,
    pwdValidator,
    infoPwdValidator,
    pwdPromptValidator,
    registerPwdValidator
  }
}
