<template>
  <div :style="'height:' + height" v-loading="loading" element-loading-text="正在加载页面，请稍候！">
    <iframe
      :id="iframeId"
      style="width: 100%; height: 100%"
      :src="src"
      frameborder="no"
    ></iframe>
  </div>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    default: "/"
  },
  iframeId: {
    type: String
  }
});

const height = ref(document.documentElement.clientHeight - 94.5 + "px");
const loading = ref(false);

onMounted(() => {
    const { proxy } = getCurrentInstance()
    const iframeId = ("#" + props.iframeId).replace(/\//g, "\\/");
    const iframe = document.querySelector(iframeId);
    // iframe页面loading控制
    if (iframe.attachEvent) {
      loading.value = true;
      iframe.attachEvent("onload", function () {
        proxy.loading = false;
      });
    } else {
      loading.value = true;
      iframe.onload = function () {
        proxy.loading = false;
      };
    }
})
</script>
