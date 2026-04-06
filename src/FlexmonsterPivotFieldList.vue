<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { PivotFieldList } from '@flexmonster/flexmonster'

const props = defineProps({
  state: { type: Object, default: undefined },
  options: { type: Object, default: undefined },
})

const wrapperRef = ref(null)
const pivotFieldList = ref(null)

onMounted(() => {
  pivotFieldList.value = PivotFieldList(wrapperRef.value, {
    state: props.state,
    options: props.options,
  })
})

onUnmounted(() => {
  if (pivotFieldList.value) {
    pivotFieldList.value.dispose()
    pivotFieldList.value = null
  }
})

defineExpose({ pivotFieldList })
</script>

<template>
  <div style="width:100%;height:100%;">
    <div ref="wrapperRef" class="fm-vue-wrapper" />
  </div>
</template>
