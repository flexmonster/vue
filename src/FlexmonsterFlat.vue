<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  state: { type: Object, default: undefined },
  options: { type: Object, default: undefined },
})

const wrapperRef = ref(null)
const flatTable = ref(null)

onMounted(async () => {
  // Dynamic import is required for SSR - the library accesses browser globals on load
  const { FlatTable } = await import('@flexmonster/flexmonster')
  flatTable.value = FlatTable(wrapperRef.value, {
    state: props.state,
    options: props.options,
  })
})

onUnmounted(() => {
  if (flatTable.value) {
    flatTable.value.dispose()
    flatTable.value = null
  }
})

defineExpose({ flatTable })
</script>

<template>
  <div style="width:100%;height:100%;">
    <div ref="wrapperRef" class="fm-vue-wrapper" />
  </div>
</template>
