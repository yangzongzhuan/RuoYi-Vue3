<template>
  <InnerLink
    v-for="(item, index) in tagsViewStore.iframeViews"
    v-show="route.path === item.path"
    :key="item.path"
    :iframe-id="`iframe${index}`"
    :src="iframeUrl(item.meta.link, item.query)"
  />
</template>

<script setup>
import useTagsViewStore from '@/store/modules/tagsView'
import InnerLink from '../InnerLink/index'

const route = useRoute()
const tagsViewStore = useTagsViewStore()

function iframeUrl(url, query) {
  if (Object.keys(query).length > 0) {
    const params = Object.keys(query).map(key => `${key}=${query[key]}`).join('&')
    return `${url}?${params}`
  }
  return url
}
</script>
