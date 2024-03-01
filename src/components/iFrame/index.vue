<!--
 * @Description: 
 * @Author: Panda
 * @Date: 2024-02-27 15:19:26
 * @LastEditors: Panda
 * @LastEditTime: 2024-02-28 18:22:31
 * @FilePath: \shop-admind:\vueworkspace\RuoYi-Vue3\src\components\iFrame\index.vue
-->
<template>
  <div v-loading="loading" :style="'height:' + height">
    <iframe :src="url" frameborder="no" style="width: 100%; height: 100%" scrolling="auto" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const height = ref(document.documentElement.clientHeight - 94.5 + 'px;')
const loading = ref(true)
const url = computed(() => props.src)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 300)
  window.onresize = function temp() {
    height.value = document.documentElement.clientHeight - 94.5 + 'px;'
  }
})
</script>
