<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  state: { type: Object, default: undefined },
  options: { type: Object, default: undefined },
})

const wrapperRef = ref(null)
const toolbar = ref(null)

onMounted(async () => {
  // Dynamic import is required for SSR - the library accesses browser globals on load
  const { Toolbar } = await import('@flexmonster/flexmonster')
  toolbar.value = Toolbar(wrapperRef.value, {
    state: props.state,
    options: props.options,
  })
})

onUnmounted(() => {
  if (toolbar.value) {
    toolbar.value.dispose()
    toolbar.value = null
  }
})

defineExpose({ toolbar })
</script>

<template>
  <div style="width:100%;height:100%;">
    <div ref="wrapperRef" class="fm-vue-wrapper" />
  </div>
</template>
