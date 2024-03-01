/*
 * @Description:
 * @Author: Panda
 * @Date: 2024-02-29 16:38:12
 * @LastEditors: Panda
 * @LastEditTime: 2024-02-29 17:08:19
 * @FilePath: \shop-admind:\vueworkspace\RuoYi-Vue3\src\plugins\i18n.ts
 */
// 多组件库的国际化和本地项目国际化兼容
import { App } from 'vue'
import { type I18n, createI18n } from 'vue-i18n'
import Cookies from 'js-cookie'

import zh from '../lang/zh'
import en from '../lang/en'

export const localesConfigs = {
  zh: {
    ...zh
  },
  en: {
    ...en
  }
}

// 此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义（只对提示起作用），如果不需要国际化可删除
export const $t = (key: string) => key

export const i18n: I18n = createI18n({
  legacy: false,
  locale: Cookies.get('local') ?? 'zh',
  fallbackLocale: 'en',
  messages: localesConfigs
})

export function useI18n(app: App) {
  app.use(i18n)
}
