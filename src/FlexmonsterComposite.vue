<script setup>
import { ref, onMounted, onUnmounted, watch} from 'vue'

const props = defineProps({
  state: { type: Object, default: undefined },
  options: { type: Object, default: undefined },
})

const wrapperRef = ref(null)
const flexmonster = ref(null)

onMounted(async () => {
  // Dynamic import is required for SSR - the library accesses browser globals on load
  const { Flexmonster } = await import('@flexmonster/flexmonster')
  flexmonster.value = Flexmonster(wrapperRef.value, {
    state: props.state,
    options: props.options,
  })
})

watch(() => props.state, async (newState) => {
  const { Flexmonster } = await import('@flexmonster/flexmonster')
  flexmonster.value = Flexmonster(wrapperRef.value, {
    state: newState,
    options: props.options,
  })})

onUnmounted(() => {
  if (flexmonster.value) {
    flexmonster.value.dispose()
    flexmonster.value = null
  }
})

defineExpose({ flexmonster })
</script>

<template>
  <div style="width:100%;height:100%;">
    <div ref="wrapperRef" class="fm-vue-wrapper" />
  </div>
</template>