import { useDark, useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'
import defaultSettings from '@/settings'
import { useDynamicTitle } from '@/utils/dynamicTitle'

const isDark = useDark()
const toggleDark = useToggle(isDark)

// eslint-disable-next-line max-len
const { sideTheme, showSettings, topNav, tagsView, tagsIcon, fixedHeader, sidebarLogo, dynamicTitle, footerVisible, footerContent } = defaultSettings

const storageSetting = JSON.parse(localStorage.getItem('layout-setting')) || ''

const useSettingsStore = defineStore(
  'settings',
  {
    state: () => ({
      title: '',
      theme: storageSetting.theme || '#409EFF',
      sideTheme: storageSetting.sideTheme || sideTheme,
      showSettings,
      topNav: storageSetting.topNav === undefined ? topNav : storageSetting.topNav,
      tagsView: storageSetting.tagsView === undefined ? tagsView : storageSetting.tagsView,
      tagsIcon: storageSetting.tagsIcon === undefined ? tagsIcon : storageSetting.tagsIcon,
      fixedHeader: storageSetting.fixedHeader === undefined ? fixedHeader : storageSetting.fixedHeader,
      sidebarLogo: storageSetting.sidebarLogo === undefined ? sidebarLogo : storageSetting.sidebarLogo,
      dynamicTitle: storageSetting.dynamicTitle === undefined ? dynamicTitle : storageSetting.dynamicTitle,
      footerVisible: storageSetting.footerVisible === undefined ? footerVisible : storageSetting.footerVisible,
      footerContent,
      isDark: isDark.value,
    }),
    actions: {
      // 修改布局设置
      changeSetting(data) {
        if (!data || typeof data !== 'object') {
          return // 或者抛出错误，取决于你的需求
        }

        const { key, value } = data

        if (Object.prototype.hasOwnProperty.call(this, key)) {
          this[key] = value
        }
      },
      // 设置网页标题
      setTitle(title) {
        this.title = title
        useDynamicTitle()
      },
      // 切换暗黑模式
      toggleTheme() {
        this.isDark = !this.isDark
        toggleDark()
      },
    },
  },
)

export default useSettingsStore
