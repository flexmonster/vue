<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Flexmonster } from '@flexmonster/flexmonster'

const props = defineProps({
  state: { type: Object, default: undefined },
  options: { type: Object, default: undefined },
})

const wrapperRef = ref(null)
const flexmonster = ref(null)

onMounted(() => {
  flexmonster.value = Flexmonster(wrapperRef.value, {
    state: props.state,
    options: props.options,
  })
})

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