<template>
  <div>
    <svg-icon icon-class="github" @click="goto" />
  </div>
</template>

<script setup lang="ts">
const url = ref<string>('https://gitee.com/y_project/RuoYi-Vue')

function goto(): void {
  window.open(url.value)
}
</script>
