<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script setup>
import useTagsViewStore from '@/store/modules/tagsView'

const tagAndTagSpacing = ref(4)
const { proxy } = getCurrentInstance()

const scrollWrapper = computed(() => proxy.$refs.scrollContainer.$refs.wrapRef)

const emits = defineEmits(['scroll', 'updateArrows'])

onMounted(() => {
  scrollWrapper.value.addEventListener('scroll', emitScroll, true)
})

onBeforeUnmount(() => {
  scrollWrapper.value.removeEventListener('scroll', emitScroll)
})

const emitScroll = () => {
  emits('scroll')
  emits('updateArrows')
}

function smoothScrollTo(target) {
  const $scrollWrapper = scrollWrapper.value
  const start = $scrollWrapper.scrollLeft
  const distance = target - start
  const duration = 300
  let startTime = null

  function ease(t, b, c, d) {
    t /= d / 2
    if (t < 1) return c / 2 * t * t + b
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    $scrollWrapper.scrollLeft = ease(elapsed, start, distance, duration)
    if (elapsed < duration) {
      requestAnimationFrame(step)
    } else {
      $scrollWrapper.scrollLeft = target
      emits('updateArrows')
    }
  }

  requestAnimationFrame(step)
}

function handleScroll(e) {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const $scrollWrapper = scrollWrapper.value
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
  emits('updateArrows')
}

const tagsViewStore = useTagsViewStore()
const visitedViews = computed(() => tagsViewStore.visitedViews)

function moveToTarget(currentTag) {
  const $container = proxy.$refs.scrollContainer.$el
  const $containerWidth = $container.offsetWidth
  const $scrollWrapper = scrollWrapper.value

  let firstTag = null
  let lastTag = null

  if (visitedViews.value.length > 0) {
    firstTag = visitedViews.value[0]
    lastTag = visitedViews.value[visitedViews.value.length - 1]
  }

  if (firstTag === currentTag) {
    smoothScrollTo(0)
  } else if (lastTag === currentTag) {
    smoothScrollTo($scrollWrapper.scrollWidth - $containerWidth)
  } else {
    const tagListDom = document.getElementsByClassName('tags-view-item')
    const currentIndex = visitedViews.value.findIndex(item => item === currentTag)
    let prevTag = null
    let nextTag = null
    for (const k in tagListDom) {
      if (k !== 'length' && Object.hasOwnProperty.call(tagListDom, k)) {
        if (tagListDom[k].dataset.path === visitedViews.value[currentIndex - 1].path) {
          prevTag = tagListDom[k]
        }
        if (tagListDom[k].dataset.path === visitedViews.value[currentIndex + 1].path) {
          nextTag = tagListDom[k]
        }
      }
    }
    const afterNextTagOffsetLeft = nextTag.offsetLeft + nextTag.offsetWidth + tagAndTagSpacing.value
    const beforePrevTagOffsetLeft = prevTag.offsetLeft - tagAndTagSpacing.value
    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      smoothScrollTo(afterNextTagOffsetLeft - $containerWidth)
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      smoothScrollTo(beforePrevTagOffsetLeft)
    }
  }
}

function scrollToStart() {
  smoothScrollTo(0)
}

function scrollToEnd() {
  const $scrollWrapper = scrollWrapper.value
  smoothScrollTo($scrollWrapper.scrollWidth - $scrollWrapper.clientWidth)
}

function getScrollState() {
  const $scrollWrapper = scrollWrapper.value
  return {
    canLeft: $scrollWrapper.scrollLeft > 0,
    canRight: $scrollWrapper.scrollLeft < $scrollWrapper.scrollWidth - $scrollWrapper.clientWidth - 1
  }
}

defineExpose({
  moveToTarget,
  scrollToStart,
  scrollToEnd,
  getScrollState
})
</script>

<style lang='scss' scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  :deep(.el-scrollbar__bar) {
    bottom: 0px;
  }
  :deep(.el-scrollbar__wrap) {
    height: 34px;
    display: flex;
    align-items: center;
  }
}
</style>