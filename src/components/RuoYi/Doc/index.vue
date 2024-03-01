<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const url = ref('http://doc.ruoyi.vip/ruoyi-vue')

function goto() {
  window.open(url.value)
}
</script>
