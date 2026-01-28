<template>
   <div>
      <i-frame v-model:src="url"></i-frame>
   </div>
</template>

<script setup lang="ts">
import iFrame from '@/components/iFrame/index.vue'

const url = ref<string>(import.meta.env.VITE_APP_BASE_API + '/druid/login.html')
</script>
