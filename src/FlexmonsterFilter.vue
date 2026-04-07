<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Filter } from '@flexmonster/flexmonster'

const props = defineProps({
  state: { type: Object, default: undefined },
  options: { type: Object, default: undefined },
})

const wrapperRef = ref(null)
const filter = ref(null)

onMounted(() => {
  filter.value = Filter(wrapperRef.value, {
    state: props.state,
    options: props.options,
  })
})

onUnmounted(() => {
  if (filter.value) {
    filter.value.dispose()
    filter.value = null
  }
})

defineExpose({ filter })
</script>

<template>
  <div style="width:100%;height:100%;">
    <div ref="wrapperRef" class="fm-vue-wrapper" />
  </div>
</template>