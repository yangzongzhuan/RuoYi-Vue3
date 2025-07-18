<template>
  <div>
    <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="toggle" />
  </div>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
</script>

<style lang='scss' scoped>
.screenfull-svg {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
  cursor: pointer;
  fill: #5a5e66;
}
</style>
