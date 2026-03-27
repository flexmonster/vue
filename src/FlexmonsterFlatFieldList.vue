<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  state: { type: Object, default: undefined },
  options: { type: Object, default: undefined },
})

const wrapperRef = ref(null)
const flatFieldList = ref(null)

onMounted(async () => {
  // Dynamic import is required for SSR - the library accesses browser globals on load
  const { FlatFieldList } = await import('@flexmonster/flexmonster')
  flatFieldList.value = FlatFieldList(wrapperRef.value, {
    state: props.state,
    options: props.options,
  })
})

onUnmounted(() => {
  if (flatFieldList.value) {
    flatFieldList.value.dispose()
    flatFieldList.value = null
  }
})

defineExpose({ flatFieldList })
</script>

<template>
  <div style="width:100%;height:100%;">
    <div ref="wrapperRef" class="fm-vue-wrapper" />
  </div>
</template>
