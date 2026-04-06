<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { FlatFieldList } from '@flexmonster/flexmonster'

const props = defineProps({
  state: { type: Object, default: undefined },
  options: { type: Object, default: undefined },
})

const wrapperRef = ref(null)
const flatFieldList = ref(null)

onMounted(() => {
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
