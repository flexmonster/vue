<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { PivotTable } from '@flexmonster/flexmonster'

const props = defineProps({
  state: { type: Object, default: undefined },
  options: { type: Object, default: undefined },
})

const wrapperRef = ref(null)
const pivotTable = ref(null)

onMounted(() => {
  pivotTable.value = PivotTable(wrapperRef.value, {
    state: props.state,
    options: props.options,
  })
})

onUnmounted(() => {
  if (pivotTable.value) {
    pivotTable.value.dispose()
    pivotTable.value = null
  }
})

defineExpose({ pivotTable })
</script>

<template>
  <div style="width:100%;height:100%;">
    <div ref="wrapperRef" class="fm-vue-wrapper" />
  </div>
</template>
