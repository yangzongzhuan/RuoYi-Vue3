<template>
  <footer v-if="visible" class="copyright">
    <span>{{ content }}</span>
  </footer>
</template>

<script setup>
import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()

const visible = computed(() => settingsStore.footerVisible)
const content = computed(() => settingsStore.footerContent)
</script>

<style scoped>
.copyright {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  height: 36px;
  padding: 10px 20px;
  font-size: 14px;
  color: #666;
  text-align: right;
  background-color: #f8f8f8;
  border-top: 1px solid #e7e7e7;
}
</style>
