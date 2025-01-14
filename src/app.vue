<template>
  <el-config-provider :size="size" :z-index="zIndex" :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import Cookies from 'js-cookie'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'
import { useBuildInfo } from '@/utils/build-info'
const { logBuildInfo } = useBuildInfo()
const size = ref(Cookies.get('size') || 'default')
const locale = ref(zhCn)
const zIndex = ref(2000)

onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(useSettingsStore().theme)
    logBuildInfo()
  })
})
</script>
